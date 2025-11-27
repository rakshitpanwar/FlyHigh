import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { validateEmail, validatePassword } from "../utils/validation";

const AuthContext = createContext();

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      // Check localStorage first (Remember Me), then sessionStorage (Standard)
      const persistentUser = localStorage.getItem("user");
      const sessionUser = sessionStorage.getItem("user");
      const storedUser = persistentUser || sessionUser;
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [loading] = useState(false);
  const [lastActivity, setLastActivity] = useState(() => Date.now());

  // Update last activity on user interaction
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Logout function (declared early for use in useEffect)
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }, []);

  // Check for session timeout
  useEffect(() => {
    if (!user) return;

    const checkTimeout = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > SESSION_TIMEOUT) {
        logout();
      }
    }, 60000); // Check every minute

    // Add activity listeners
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    return () => {
      clearInterval(checkTimeout);
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [user, lastActivity, updateActivity, logout]);

    const login = (email, password, rememberMe = false) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Validate email format
                const emailValidation = validateEmail(email);
                if (!emailValidation.valid) {
                    reject(emailValidation.message);
                    return;
                }

                if (!password) {
                    reject('Password is required');
                    return;
                }

                // SIMULATED DATABASE CHECK
                const users = JSON.parse(localStorage.getItem('flyhigh_users') || '[]');
                const foundUser = users.find(u => u.email === email);

                if (!foundUser) {
                    reject('Account not found. Please sign up first.');
                    return;
                }

                if (foundUser.password !== password) {
                    reject('Invalid email or password.');
                    return;
                }

                // Create session user (exclude password from session)
                const { password: _, ...sessionUser } = foundUser;
                
                setUser(sessionUser);
                
                if (rememberMe) {
                    localStorage.setItem('user', JSON.stringify(sessionUser));
                } else {
                    sessionStorage.setItem('user', JSON.stringify(sessionUser));
                }
                
                setLastActivity(Date.now());
                resolve(sessionUser);
            }, 1000);
        });
    };

    const signup = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Validate email
                const emailValidation = validateEmail(email);
                if (!emailValidation.valid) {
                    reject(emailValidation.message);
                    return;
                }

                // Validate password
                const passwordValidation = validatePassword(password);
                if (!passwordValidation.valid) {
                    reject(passwordValidation.message);
                    return;
                }

                // CHECK IF USER EXISTS
                const users = JSON.parse(localStorage.getItem('flyhigh_users') || '[]');
                if (users.some(u => u.email === email)) {
                    reject('An account with this email already exists.');
                    return;
                }

                // Create new user
                const newUser = { 
                    id: Date.now().toString(), 
                    email, 
                    password, // NOTE: In a real app, never store passwords plainly!
                    name: email.split('@')[0],
                    createdAt: new Date().toISOString()
                };

                // Save to "Database"
                users.push(newUser);
                localStorage.setItem('flyhigh_users', JSON.stringify(users));
                
                // Create session user (exclude password)
                const { password: _, ...sessionUser } = newUser;
                
                setUser(sessionUser);
                // Default to session storage for signup
                sessionStorage.setItem('user', JSON.stringify(sessionUser));
                setLastActivity(Date.now());
                resolve(sessionUser);
            }, 1000);
        });
    };

    const updateProfile = (updates) => {
        if (!user) return;
        
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        
        // Update session/local storage (current session)
        if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        if (sessionStorage.getItem('user')) {
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
        }

        // Update "Database" (persistent record)
        const users = JSON.parse(localStorage.getItem('flyhigh_users') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);
        
        if (userIndex !== -1) {
            // Merge updates into the stored user record (preserving password)
            users[userIndex] = { ...users[userIndex], ...updates };
            localStorage.setItem('flyhigh_users', JSON.stringify(users));
        }
    };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
