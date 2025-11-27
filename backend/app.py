from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and encoders
try:
    model = joblib.load('model.pkl')
    encoders = joblib.load('encoders.pkl')
    print("Model and encoders loaded successfully.")
except Exception as e:
    print(f"Error loading model/encoders: {e}")
    model = None
    encoders = None

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not encoders:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.json
        
        # Prepare input dataframe
        # Expected keys: airline, flight, source_city, departure_time, stops, arrival_time, destination_city, class, duration, days_left
        # Note: 'flight' might be missing from frontend, we might need to handle it or use a default/dummy if it's not critical, 
        # but the model was trained with it. For now, let's assume we can pass a dummy or the frontend sends it.
        # Actually, looking at the frontend, we don't select 'flight' (e.g. SG-8709). 
        # The model uses it, so we must provide it. We can pick a most frequent one or handle it.
        # Let's check if we can handle 'flight' being unknown. LabelEncoder will fail on unseen labels.
        # Ideally, we should have dropped 'flight' as it's too specific, but we are following the notebook.
        # Workaround: Use the first class from the encoder as a fallback.
        
        input_data = {
            'airline': data.get('airline'),
            'flight': data.get('flight', encoders['flight'].classes_[0]), # Fallback if not provided
            'source_city': data.get('source_city'),
            'departure_time': data.get('departure_time', 'Morning'), # Default
            'stops': data.get('stops'),
            'arrival_time': data.get('arrival_time', 'Night'), # Default
            'destination_city': data.get('destination_city'),
            'class': data.get('class_type'), # Frontend sends 'class_type'
            'duration': float(data.get('duration', 2.0)), # Default duration
            'days_left': int(data.get('days_left', 1))
        }
        
        # Create DataFrame
        df = pd.DataFrame([input_data])
        
        # Encode categorical columns
        for col, le in encoders.items():
            if col in df.columns:
                # Handle unseen labels by assigning a default (e.g., the first class)
                # This is a robust way to handle user input that might not match training data exactly
                df[col] = df[col].apply(lambda x: x if x in le.classes_ else le.classes_[0])
                df[col] = le.transform(df[col])
        
        # Predict
        prediction = model.predict(df)
        
        return jsonify({
            'price': float(prediction[0]),
            'currency': 'INR'
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
