import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    PlaneIcon, Calendar, Clock, MapPin, Tag, Briefcase, 
    ChevronRight, CheckCircle, TrendingUp, AlertCircle, ArrowRight 
} from '../components/Icons';
import { AIRLINES, CITIES, TIMES, STOPS, CLASSES } from '../constants';

export default function Home() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        airline: 'Vistara',
        source_city: 'Delhi',
        destination_city: 'Mumbai',
        departure_time: 'Morning',
        arrival_time: 'Evening',
        stops: 'one',
        class_type: 'Economy',
        duration: 2.5,
        days_left: 20,
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSearch = () => {
        navigate('/results', { state: formData });
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Hero Text */}
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Perfect Flight</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                    Search hundreds of airlines and find the best deals for your next journey.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden group transition-colors">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700/50 pb-4">
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <Briefcase className="text-sky-500 dark:text-sky-400" size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Trip Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Airline */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Airline</label>
                                <div className="relative group/input">
                                    <select 
                                        value={formData.airline}
                                        onChange={(e) => handleChange('airline', e.target.value)}
                                        className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all hover:border-slate-300 dark:hover:border-slate-600"
                                    >
                                        {AIRLINES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <ChevronRight size={16} className="rotate-90"/>
                                    </div>
                                </div>
                            </div>

                            {/* Travel Class */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Class</label>
                                <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                                    {CLASSES.map(cls => (
                                        <button
                                            key={cls.id}
                                            onClick={() => handleChange('class_type', cls.id)}
                                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                                                formData.class_type === cls.id 
                                                    ? 'bg-white dark:bg-slate-700 text-sky-500 dark:text-sky-400 shadow-sm' 
                                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                            }`}
                                        >
                                            {cls.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Source */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <MapPin size={14} className="text-sky-500"/> Origin
                                </label>
                                <div className="relative group/input">
                                    <select 
                                        value={formData.source_city}
                                        onChange={(e) => handleChange('source_city', e.target.value)}
                                        className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all hover:border-slate-300 dark:hover:border-slate-600"
                                    >
                                        {CITIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Destination */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <MapPin size={14} className="text-indigo-500"/> Destination
                                </label>
                                <div className="relative group/input">
                                    <select 
                                        value={formData.destination_city}
                                        onChange={(e) => handleChange('destination_city', e.target.value)}
                                        className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all hover:border-slate-300 dark:hover:border-slate-600"
                                    >
                                        {CITIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-2xl transition-colors">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700/50 pb-4">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <Clock className="text-indigo-500 dark:text-indigo-400" size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Logistics</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Departure</label>
                            <select 
                                value={formData.departure_time}
                                onChange={(e) => handleChange('departure_time', e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {TIMES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Arrival</label>
                            <select 
                                value={formData.arrival_time}
                                onChange={(e) => handleChange('arrival_time', e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {TIMES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Stops</label>
                            <select 
                                value={formData.stops}
                                onChange={(e) => handleChange('stops', e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {STOPS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                            </select>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration</label>
                                <span className="text-xs font-mono text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-500/30 px-2 py-1 rounded">{formData.duration} hrs</span>
                            </div>
                            <input 
                                type="range" min="1" max="24" step="0.5"
                                value={formData.duration}
                                onChange={(e) => handleChange('duration', parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Calendar size={14} className="text-slate-500"/> Days Out
                                </label>
                                <span className={`text-xs font-mono px-2 py-1 rounded border ${formData.days_left < 7 ? 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-500/30' : 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-500/30'}`}>
                                    {formData.days_left} Days
                                </span>
                            </div>
                            <input 
                                type="range" min="1" max="50" step="1"
                                value={formData.days_left}
                                onChange={(e) => handleChange('days_left', parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleSearch}
                    className="w-full py-5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-lg tracking-wide border-t border-white/10"
                >
                    Search Flights <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
