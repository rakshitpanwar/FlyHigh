import React, { useState } from 'react';
import { AIRLINES, CITIES, STOPS, CLASSES } from '../constants';
import { TrendingUp, AlertCircle, CheckCircle } from '../components/Icons';

import CustomSelect from '../components/CustomSelect';

export default function PricePrediction() {
    const [formData, setFormData] = useState({
        airline: 'Vistara',
        source_city: 'Delhi',
        destination_city: 'Mumbai',
        stops: 'one',
        class_type: 'Economy',
        date: new Date().toISOString().split('T')[0],
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handlePredict = async () => {
        setLoading(true);
        setPrediction(null);
        
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (!response.ok) {
                throw new Error('Prediction failed');
            }
            
            const data = await response.json();
            
            setPrediction({
                price: Math.round(data.price),
                confidence: 98.5, // Placeholder as model doesn't return confidence interval yet
                features: [
                    { name: 'Airline', impact: 'High' },
                    { name: 'Route', impact: 'Medium' },
                    { name: 'Seasonality', impact: 'Low' }
                ]
            });
        } catch (error) {
            console.error("Error predicting price:", error);
            alert("Failed to connect to ML Backend. Make sure python app.py is running!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                    <TrendingUp size={16} />
                    <span>ML Model: RandomForest Regressor</span>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Flight Price Predictor</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                    Enter your flight details below to get an estimated price using our trained machine learning model.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Input Parameters</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <CustomSelect 
                            label="Airline"
                            value={formData.airline}
                            options={AIRLINES}
                            onChange={(val) => handleChange('airline', val)}
                        />

                        <CustomSelect 
                            label="Class"
                            value={formData.class_type}
                            options={CLASSES}
                            onChange={(val) => handleChange('class_type', val)}
                        />

                        <CustomSelect 
                            label="Source"
                            value={formData.source_city}
                            options={CITIES}
                            onChange={(val) => handleChange('source_city', val)}
                        />

                        <CustomSelect 
                            label="Destination"
                            value={formData.destination_city}
                            options={CITIES}
                            onChange={(val) => handleChange('destination_city', val)}
                        />

                        <CustomSelect 
                            label="Stops"
                            value={formData.stops}
                            options={STOPS}
                            onChange={(val) => handleChange('stops', val)}
                        />

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Date</label>
                            <input 
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handlePredict}
                        disabled={loading}
                        className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Running Model...
                            </>
                        ) : (
                            <>Predict Price <TrendingUp size={20} /></>
                        )}
                    </button>
                </div>

                {/* Results Panel */}
                <div className="space-y-6">
                    <div className={`h-full bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-700 flex flex-col items-center justify-center text-center transition-all duration-500 ${prediction ? 'opacity-100 scale-100' : 'opacity-50 scale-95 grayscale'}`}>
                        {prediction ? (
                            <>
                                <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2">Estimated Price</p>
                                <div className="text-5xl font-black mb-4">
                                    ₹{prediction.price.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-sm font-medium">
                                    <CheckCircle size={14} />
                                    {prediction.confidence}% Confidence
                                </div>
                                
                                <div className="w-full mt-8 pt-8 border-t border-slate-700 space-y-4">
                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider text-left">Feature Importance</p>
                                    {prediction.features.map((f, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <span className="text-slate-300">{f.name}</span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                                f.impact === 'High' ? 'bg-rose-500/20 text-rose-400' :
                                                f.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                                                'bg-blue-500/20 text-blue-400'
                                            }`}>{f.impact}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-slate-500">
                                <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
                                <p className="font-medium">Ready to Predict</p>
                                <p className="text-sm mt-2 opacity-70">Fill out the form and run the model to see results.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
