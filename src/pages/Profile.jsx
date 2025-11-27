import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, LogOut } from '../components/Icons';

export default function Profile() {
    const { user, logout, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Available avatars
    const avatars = ['👨‍✈️', '👩‍✈️', '🦁', '🐯', '🐼', '🦊', '🐶', '🐱', '🦄', '🐲', '👽', '🤖', '⚡', '🔥', '🌍', '✈️'];

    const handleSave = () => {
        updateProfile({ name, avatar: selectedAvatar });
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleLogout = () => {
        logout();
    };

    if (!user) return null;

    return (
        <div className="min-h-[80vh] py-12 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-colors">
                    
                    {/* Header / Banner */}
                    <div className="h-32 bg-gradient-to-r from-sky-400 to-indigo-500 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 p-1.5 shadow-lg">
                                <div className="w-full h-full rounded-xl bg-gradient-to-tr from-sky-100 to-indigo-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-4xl border border-slate-200 dark:border-slate-600">
                                    {selectedAvatar || name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                    {user.name}
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    {user.email}
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                                    isEditing 
                                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                        : 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 hover:bg-sky-600'
                                }`}
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        {successMessage && (
                            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 flex items-center gap-2 animate-fade-in">
                                <CheckCircle size={20} />
                                {successMessage}
                            </div>
                        )}

                        <div className="space-y-8">
                            {/* Edit Form */}
                            {isEditing ? (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Display Name</label>
                                        <input 
                                            type="text" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Choose Avatar</label>
                                        <div className="grid grid-cols-8 gap-2">
                                            {avatars.map(avatar => (
                                                <button
                                                    key={avatar}
                                                    onClick={() => setSelectedAvatar(avatar)}
                                                    className={`aspect-square flex items-center justify-center text-2xl rounded-xl transition-all ${
                                                        selectedAvatar === avatar
                                                            ? 'bg-sky-100 dark:bg-sky-900/50 border-2 border-sky-500 scale-110 shadow-md'
                                                            : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                    }`}
                                                >
                                                    {avatar}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handleSave}
                                        className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                /* View Mode */
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Member Since</p>
                                        <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                                            {new Date(user.createdAt).toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Account Status</p>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <p className="text-lg font-medium text-slate-700 dark:text-slate-200">Active</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Logout Section */}
                            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                                {!showLogoutConfirm ? (
                                    <button 
                                        onClick={() => setShowLogoutConfirm(true)}
                                        className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-semibold transition-colors"
                                    >
                                        <LogOut size={20} />
                                        Sign Out
                                    </button>
                                ) : (
                                    <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50 rounded-xl p-4 flex items-center justify-between animate-fade-in">
                                        <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">Are you sure you want to sign out?</p>
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => setShowLogoutConfirm(false)}
                                                className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={handleLogout}
                                                className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
