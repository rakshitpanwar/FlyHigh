import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneIcon, TrendingUp } from '../components/Icons';

export default function Landing() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <div className="max-w-5xl w-full space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">FlyHigh</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Experience the future of air travel. Predict prices with AI or book your next adventure today.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Prediction Card */}
                    <Link to="/predict" className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl hover:shadow-sky-500/20 transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="p-8 h-full flex flex-col items-center text-center space-y-6 relative z-10">
                            <div className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                                <TrendingUp size={40} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Price Prediction</h2>
                                <p className="text-slate-500 dark:text-slate-400">
                                    Use our advanced Machine Learning model to forecast flight prices and find the cheapest time to fly.
                                </p>
                            </div>
                            <div className="mt-auto pt-6">
                                <span className="inline-flex items-center gap-2 text-indigo-500 font-bold group-hover:gap-3 transition-all">
                                    Start Analysis <TrendingUp size={18} />
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Booking Card */}
                    <Link to="/book" className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl hover:shadow-sky-500/20 transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="p-8 h-full flex flex-col items-center text-center space-y-6 relative z-10">
                            <div className="w-20 h-20 rounded-2xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform duration-500">
                                <PlaneIcon size={40} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Book Flights</h2>
                                <p className="text-slate-500 dark:text-slate-400">
                                    Search hundreds of airlines, compare prices, and book your perfect flight instantly.
                                </p>
                            </div>
                            <div className="mt-auto pt-6">
                                <span className="inline-flex items-center gap-2 text-sky-500 font-bold group-hover:gap-3 transition-all">
                                    Search Now <PlaneIcon size={18} />
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
