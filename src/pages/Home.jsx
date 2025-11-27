import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    PlaneIcon, Calendar, Clock, MapPin, Tag, Briefcase, 
    ChevronRight, CheckCircle, TrendingUp, AlertCircle, ArrowRight 
} from '../components/Icons';
import { AIRLINES, CITIES, TIMES, STOPS, CLASSES } from '../constants';

import CustomSelect from '../components/CustomSelect';

export default function Home() {
    const navigate = useNavigate();
    
    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const [formData, setFormData] = useState({
        source_city: 'Delhi',
        destination_city: 'Mumbai',
        class_type: 'Economy',
        date: getTodayDate(),
        days_left: 0,
    });

    const handleChange = (field, value) => {
        if (field === 'date') {
            // Calculate days_left based on selected date
            const selectedDate = new Date(value);
            const today = new Date();
            const diffTime = Math.abs(selectedDate - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            setFormData(prev => ({ 
                ...prev, 
                date: value,
                days_left: diffDays 
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSearch = () => {
        navigate('/results', { state: formData });
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Hero Text */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-6">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white transition-colors">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Perfect Flight</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">
                    Compare prices across hundreds of airlines and book your next adventure today.
                </p>
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 shadow-2xl shadow-indigo-500/10 relative overflow-hidden group transition-all hover:shadow-indigo-500/20">
                    
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 space-y-8">
                        {/* Class Selection */}
                        <div className="flex justify-center">
                            <div className="inline-flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                                {CLASSES.map(cls => (
                                    <button
                                        key={cls.id}
                                        onClick={() => handleChange('class_type', cls.id)}
                                        className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                                            formData.class_type === cls.id 
                                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                    >
                                        {cls.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Inputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                            
                            {/* Source */}
                            <div className="md:col-span-4">
                                <CustomSelect 
                                    label="From"
                                    icon={MapPin}
                                    value={formData.source_city}
                                    options={CITIES}
                                    onChange={(val) => handleChange('source_city', val)}
                                />
                            </div>

                            {/* Swap Icon (Visual Only) */}
                            <div className="hidden md:flex md:col-span-1 justify-center pb-4 text-slate-300 dark:text-slate-600">
                                <ArrowRight size={24} />
                            </div>

                            {/* Destination */}
                            <div className="md:col-span-4">
                                <CustomSelect 
                                    label="To"
                                    icon={MapPin}
                                    value={formData.destination_city}
                                    options={CITIES}
                                    onChange={(val) => handleChange('destination_city', val)}
                                />
                            </div>

                            {/* Date */}
                            <div className="md:col-span-3">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Departure</label>
                                    <div className="relative group/date">
                                        <input 
                                            type="date"
                                            min={getTodayDate()}
                                            value={formData.date}
                                            onChange={(e) => handleChange('date', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover/date:text-indigo-500 transition-colors">
                                            <Calendar size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button 
                            onClick={handleSearch}
                            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-lg tracking-wide border-t border-white/10 mt-4"
                        >
                            Search Flights <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto text-center">
                    <div className="space-y-2">
                        <div className="w-12 h-12 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <CheckCircle size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Best Price Guarantee</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Clock size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Real-time Updates</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="w-12 h-12 mx-auto bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400">
                            <Tag size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">No Hidden Fees</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
