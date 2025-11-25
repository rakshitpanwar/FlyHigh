import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { validateEmail, validatePassword } from '../utils/validation';

const AuthContext = createContext();

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            const rememberedUser = localStorage.getItem('rememberedUser');
            return storedUser ? JSON.parse(storedUser) : (rememberedUser ? JSON.parse(rememberedUser) : null);
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
        localStorage.removeItem('user');
        // Keep rememberedUser for "Remember Me" functionality
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
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => {
            window.addEventListener(event, updateActivity);
        });

        return () => {
            clearInterval(checkTimeout);
            events.forEach(event => {
                window.removeEventListener(event, updateActivity);
            });
        };
    }, [user, lastActivity, updateActivity, logout]);

    const login = (email, password, rememberMe = false) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Validate email
                const emailValidation = validateEmail(email);
                if (!emailValidation.valid) {
                    reject(emailValidation.message);
                    return;
                }

                if (!password) {
                    reject('Password is required');
                    return;
                }

                // Mock successful login
                const mockUser = { 
                    id: '1', 
                    email, 
                    name: email.split('@')[0],
                    createdAt: new Date().toISOString()
                };
                
                setUser(mockUser);
                localStorage.setItem('user', JSON.stringify(mockUser));
                
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify(mockUser));
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                
                setLastActivity(Date.now());
                resolve(mockUser);
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

                // Mock successful signup
                const mockUser = { 
                    id: '1', 
                    email, 
                    name: email.split('@')[0],
                    createdAt: new Date().toISOString()
                };
                
                setUser(mockUser);
                localStorage.setItem('user', JSON.stringify(mockUser));
                setLastActivity(Date.now());
                resolve(mockUser);
            }, 1000);
        });
    };

    const updateProfile = (updates) => {
        if (!user) return;
        
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            localStorage.setItem('rememberedUser', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
