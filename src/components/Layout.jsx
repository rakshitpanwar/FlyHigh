import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { PlaneIcon } from './Icons';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
    const { user } = useAuth();

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid opacity-[0.05] dark:opacity-20"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
            </div>

            {/* Header */}
            <header className="relative z-50 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md transition-colors">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="bg-gradient-to-tr from-sky-400 to-indigo-500 p-2.5 rounded-xl shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform duration-300">
                            <PlaneIcon size={24} className="text-white transform rotate-0" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-100 dark:to-indigo-100 tracking-tight transition-colors">FlyHigh</h1>
                        </div>
                    </Link>
                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400 items-center">
                            <Link to="/book" className="hover:text-sky-500 transition-colors">Book Flights</Link>
                            <Link to="/predict" className="hover:text-indigo-500 transition-colors">AI Prediction</Link>
                            {user ? (
                                <>
                                    <Link to="/profile" className="flex items-center gap-2 hover:text-sky-500 transition-colors">
                                        {user.avatar ? (
                                            <span className="text-xl">{user.avatar}</span>
                                        ) : (
                                            <span>Profile</span>
                                        )}
                                        <span className="text-slate-900 dark:text-slate-200 font-semibold">
                                            {user.name}
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/login" className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors">Login</Link>
                            )}
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-grow w-full">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 mt-12 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center">
                    <p className="text-slate-500 text-sm">© 2025 FlyHigh AI</p>
                </div>
            </footer>
        </div>
    );
}
