import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, CheckCircle } from './Icons';

export default function CustomSelect({ label, value, options, onChange, icon: Icon, placeholder = "Select option" }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.id === value);

    return (
        <div className="space-y-2" ref={dropdownRef}>
            {label && (
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    {Icon && <Icon size={14} className="text-sky-500" />} {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 text-left flex items-center justify-between transition-all duration-200 ${
                        isOpen 
                            ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-lg shadow-sky-500/10' 
                            : 'border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500'
                    }`}
                >
                    <span className={`font-medium truncate ${selectedOption ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronRight 
                        size={16} 
                        className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-90 text-sky-500' : ''}`} 
                    />
                </button>

                {/* Dropdown Menu */}
                <div 
                    className={`absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden transition-all duration-200 origin-top ${
                        isOpen 
                            ? 'opacity-100 scale-100 translate-y-0 visible' 
                            : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                    }`}
                >
                    <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => {
                                    onChange(option.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-left flex items-center justify-between transition-colors ${
                                    value === option.id
                                        ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 font-medium'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                }`}
                            >
                                <span className="truncate">{option.label}</span>
                                {value === option.id && (
                                    <CheckCircle size={16} className="text-sky-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
