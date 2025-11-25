import { AIRLINES, CITIES, TIMES, STOPS, CLASSES } from '../constants';

export const searchFlights = (params) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const results = [];
            const source = CITIES.find(c => c.id === params.source_city);
            const dest = CITIES.find(c => c.id === params.destination_city);
            
            // Generate 3-5 flight options
            const numFlights = Math.floor(Math.random() * 3) + 3;

            for (let i = 0; i < numFlights; i++) {
                const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];
                const stop = STOPS[Math.floor(Math.random() * STOPS.length)];
                const depTime = TIMES[Math.floor(Math.random() * TIMES.length)];
                
                // Calculate base price similar to original logic but slightly randomized per flight
                let price = airline.basePrice;
                price = price * ((source.factor + dest.factor) / 2);
                price += (Math.random() * 2 + 1) * 400; // Random duration cost
                price += stop.cost;
                price = price * depTime.factor;
                
                // Days left factor
                const daysLeft = params.days_left || 20;
                const daysFactor = 1 + (50 - daysLeft) / 25;
                price = price * daysFactor;

                // Class multiplier
                const cls = CLASSES.find(c => c.id === (params.class_type || 'Economy'));
                price = price * cls.multiplier;

                // Noise
                const noise = (Math.random() * 400) - 200;
                const finalPrice = Math.round(price + noise);

                results.push({
                    id: `flight-${Date.now()}-${i}`,
                    airline: airline,
                    source: source,
                    destination: dest,
                    departureTime: depTime.label,
                    arrivalTime: TIMES[(TIMES.indexOf(depTime) + 2) % TIMES.length].label, // Mock arrival time
                    stops: stop,
                    price: finalPrice,
                    duration: `${Math.floor(Math.random() * 3 + 2)}h ${Math.floor(Math.random() * 60)}m`,
                    bookingLink: `https://www.google.com/search?q=flight+${airline.label}+${source.label}+to+${dest.label}`
                });
            }

            // Sort by price
            results.sort((a, b) => a.price - b.price);
            resolve(results);
        }, 1500);
    });
};
