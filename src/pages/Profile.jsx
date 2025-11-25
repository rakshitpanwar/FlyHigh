import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle } from '../components/Icons';

export default function Profile() {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSave = () => {
        updateProfile({ name });
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden transition-colors">
                {/* Header */}
                <div className="bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-12 text-white">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/30">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{user?.name || 'User'}</h1>
                            <p className="text-sky-100">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {saveSuccess && (
                    <div className="mx-8 mt-6 p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                        <CheckCircle size={20} />
                        Profile updated successfully!
                    </div>
                )}

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* Account Information */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Account Information</h2>
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                                <div className="flex-1">
                                    <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 block mb-2">Display Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        />
                                    ) : (
                                        <p className="text-lg font-medium text-slate-900 dark:text-white">{user?.name}</p>
                                    )}
                                </div>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="ml-4 px-4 py-2 text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            {/* Email (Read-only) */}
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 block mb-2">Email Address</label>
                                <p className="text-lg font-medium text-slate-900 dark:text-white">{user?.email}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Email cannot be changed</p>
                            </div>

                            {/* Account Created */}
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 block mb-2">Member Since</label>
                                <p className="text-lg font-medium text-slate-900 dark:text-white">
                                    {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setName(user?.name || '');
                                    }}
                                    className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setShowLogoutConfirm(true)}
                                className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Confirm Logout</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Are you sure you want to logout? You'll need to sign in again to access your account.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleLogout}
                                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
