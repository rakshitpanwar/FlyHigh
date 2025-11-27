import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Define paths
# Define paths
DATA_PATH = 'Clean_Dataset.csv'
MODEL_PATH = 'backend/model.pkl'
ENCODERS_PATH = 'backend/encoders.pkl'

def train_and_export():
    print("Loading dataset...")
    if not os.path.exists(DATA_PATH):
        print(f"Error: {DATA_PATH} not found.")
        return

    df = pd.read_csv(DATA_PATH)
    
    # Preprocessing based on notebook
    if 'Unnamed: 0' in df.columns:
        df = df.drop("Unnamed: 0", axis=1)
    
    # Categorical columns to encode
    cat_cols = ['airline', 'flight', 'source_city', 'departure_time', 
                'stops', 'arrival_time', 'destination_city', 'class']
    
    encoders = {}
    df_encoded = df.copy()
    
    print("Encoding categorical features...")
    for col in cat_cols:
        le = LabelEncoder()
        df_encoded[col] = le.fit_transform(df[col])
        encoders[col] = le
    
    # Features and Target
    X = df_encoded.drop('price', axis=1)
    y = df_encoded['price']
    
    # Train Model
    print("Training Random Forest Regressor (this may take a moment)...")
    rf = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1) # Reduced estimators for speed, n_jobs for parallel
    rf.fit(X, y)
    
    # Save Model and Encoders
    print("Saving model and encoders...")
    joblib.dump(rf, MODEL_PATH)
    joblib.dump(encoders, ENCODERS_PATH)
    
    print("Done! Model and encoders saved.")
    print(f"Model R2 Score: {rf.score(X, y):.4f}")

if __name__ == "__main__":
    train_and_export()
