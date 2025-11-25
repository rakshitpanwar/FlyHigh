export const AIRLINES = [
    { id: 'Vistara', label: 'Vistara', basePrice: 5000 },
    { id: 'Air_India', label: 'Air India', basePrice: 4500 },
    { id: 'Indigo', label: 'Indigo', basePrice: 3500 },
    { id: 'GO_FIRST', label: 'GO FIRST', basePrice: 3200 },
    { id: 'AirAsia', label: 'AirAsia', basePrice: 3000 },
    { id: 'SpiceJet', label: 'SpiceJet', basePrice: 3100 },
];

export const CITIES = [
    { id: 'Delhi', label: 'Delhi', factor: 1.1 },
    { id: 'Mumbai', label: 'Mumbai', factor: 1.2 },
    { id: 'Bangalore', label: 'Bangalore', factor: 1.15 },
    { id: 'Kolkata', label: 'Kolkata', factor: 1.0 },
    { id: 'Hyderabad', label: 'Hyderabad', factor: 1.05 },
    { id: 'Chennai', label: 'Chennai', factor: 1.05 },
];

export const TIMES = [
    { id: 'Early_Morning', label: 'Early Morning', factor: 0.9 },
    { id: 'Morning', label: 'Morning', factor: 1.1 },
    { id: 'Afternoon', label: 'Afternoon', factor: 1.0 },
    { id: 'Evening', label: 'Evening', factor: 1.15 },
    { id: 'Night', label: 'Night', factor: 0.95 },
    { id: 'Late_Night', label: 'Late Night', factor: 0.85 },
];

export const STOPS = [
    { id: 'zero', label: 'Non-stop', cost: 0 },
    { id: 'one', label: '1 Stop', cost: 1500 },
    { id: 'two_or_more', label: '2+ Stops', cost: 2800 },
];

export const CLASSES = [
    { id: 'Economy', label: 'Economy', multiplier: 1 },
    { id: 'Business', label: 'Business', multiplier: 3.5 },
];
