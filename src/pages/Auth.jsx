import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, AlertCircle, Eye, EyeOff, CheckCircle } from '../components/Icons';
import { useAuth } from '../context/AuthContext';
import { 
    validateEmail, 
    validatePassword, 
    getPasswordStrengthLabel, 
    getPasswordStrengthWidth,
    getPasswordStrengthColor 
} from '../utils/validation';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [touched, setTouched] = useState({ email: false, password: false });
    
    const navigate = useNavigate();
    const location = useLocation();
    const { login, signup } = useAuth();

    // Get the page user was trying to access
    const from = location.state?.from?.pathname || '/';

    // Validate email on change
    useEffect(() => {
        if (touched.email && email) {
            const result = validateEmail(email);
            setEmailError(result.valid ? '' : result.message);
        }
    }, [email, touched.email]);

    // Validate password on change
    useEffect(() => {
        if (password) {
            const result = validatePassword(password);
            setPasswordStrength(result.strength);
            if (touched.password && !isLogin) {
                setPasswordError(result.valid ? '' : result.message);
            }
        } else {
            setPasswordStrength(0);
            setPasswordError('');
        }
    }, [password, touched.password, isLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Validate email
        const emailValidation = validateEmail(email);
        if (!emailValidation.valid) {
            setEmailError(emailValidation.message);
            setTouched({ ...touched, email: true });
            return;
        }

        // Validate password for signup
        if (!isLogin) {
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.valid) {
                setPasswordError(passwordValidation.message);
                setTouched({ ...touched, password: true });
                return;
            }
        } else {
            // For login, just check if password exists
            if (!password) {
                setPasswordError('Password is required');
                return;
            }
        }

        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password, rememberMe);
            } else {
                await signup(email, password);
            }
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setEmailError('');
        setPasswordError('');
        setTouched({ email: false, password: false });
    };

    const strengthInfo = getPasswordStrengthLabel(passwordStrength);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-2xl transition-colors">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-2xl mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        {isLogin ? 'Enter your details to access your account' : 'Start your journey with FlyHigh today'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-xl bg-rose-100 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched({ ...touched, email: true })}
                            className={`w-full bg-slate-50 dark:bg-slate-900 border ${
                                emailError && touched.email 
                                    ? 'border-rose-500 dark:border-rose-500' 
                                    : 'border-slate-200 dark:border-slate-700'
                            } rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors`}
                            placeholder="name@example.com"
                        />
                        {emailError && touched.email && (
                            <p className="text-xs text-rose-500 flex items-center gap-1">
                                <AlertCircle size={12} />
                                {emailError}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setTouched({ ...touched, password: true })}
                                className={`w-full bg-slate-50 dark:bg-slate-900 border ${
                                    passwordError && touched.password 
                                        ? 'border-rose-500 dark:border-rose-500' 
                                        : 'border-slate-200 dark:border-slate-700'
                                } rounded-xl px-4 py-3 pr-12 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        
                        {passwordError && touched.password && (
                            <p className="text-xs text-rose-500 flex items-center gap-1">
                                <AlertCircle size={12} />
                                {passwordError}
                            </p>
                        )}

                        {/* Password Strength Indicator (only for signup) */}
                        {!isLogin && password && (
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500 dark:text-slate-400">Password strength:</span>
                                    <span className={`font-semibold ${strengthInfo.color}`}>{strengthInfo.label}</span>
                                </div>
                                <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                                        style={{ width: getPasswordStrengthWidth(passwordStrength) }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Remember Me (only for login) */}
                    {isLogin && (
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500 focus:ring-offset-0"
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                            </label>
                            <button 
                                type="button"
                                className="text-sm text-sky-500 hover:text-sky-400 font-semibold transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={loading || (touched.email && emailError) || (touched.password && passwordError && !isLogin)}
                        className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            onClick={toggleMode}
                            className="text-sky-500 hover:text-sky-400 font-semibold transition-colors"
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
