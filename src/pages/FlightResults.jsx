import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchFlights } from '../services/FlightService';
import { PlaneIcon, Clock, ArrowRight, CheckCircle, AlertCircle } from '../components/Icons';

export default function FlightResults() {
    const location = useLocation();
    const searchParams = useMemo(() => location.state || {}, [location.state]);
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);
            try {
                const results = await searchFlights(searchParams);
                setFlights(results);
            } catch (error) {
                console.error("Failed to fetch flights", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Searching best flights for you...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Flight Results</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Found {flights.length} flights from {searchParams.source_city} to {searchParams.destination_city}
                    </p>
                </div>
                <Link to="/" className="text-sky-500 hover:text-sky-600 font-medium text-sm">Modify Search</Link>
            </div>

            <div className="space-y-4">
                {flights.map((flight) => (
                    <div key={flight.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            
                            {/* Airline Info */}
                            <div className="flex items-center gap-4 w-full md:w-1/4">
                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-2xl">
                                    ✈️
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{flight.airline.label}</h3>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                                        {flight.stops.label}
                                    </span>
                                </div>
                            </div>

                            {/* Flight Times */}
                            <div className="flex-1 flex items-center justify-center gap-8 w-full">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-slate-900 dark:text-white">{flight.departureTime}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{flight.source.id}</div>
                                </div>
                                
                                <div className="flex flex-col items-center gap-1 flex-1 max-w-[120px]">
                                    <span className="text-xs text-slate-400">{flight.duration}</span>
                                    <div className="w-full h-[2px] bg-slate-300 dark:bg-slate-600 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-xl font-bold text-slate-900 dark:text-white">{flight.arrivalTime}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{flight.destination.id}</div>
                                </div>
                            </div>

                            {/* Price & Action */}
                            <div className="w-full md:w-1/4 flex flex-col items-end gap-3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700 pt-4 md:pt-0 md:pl-6">
                                <div className="text-right">
                                    <span className="text-sm text-slate-400">Price per adult</span>
                                    <div className="text-3xl font-bold text-slate-900 dark:text-white">₹{flight.price.toLocaleString()}</div>
                                </div>
                                <a 
                                    href={flight.bookingLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    Book Now <ArrowRight size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
