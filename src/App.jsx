import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import FlightResults from './pages/FlightResults';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import PricePrediction from './pages/PricePrediction';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Landing />} />
                    <Route path="book" element={<Home />} />
                    <Route path="predict" element={<PricePrediction />} />
                    <Route path="login" element={<Auth />} />
                    <Route path="signup" element={<Auth />} />
                    <Route path="results" element={
                        <ProtectedRoute>
                            <FlightResults />
                        </ProtectedRoute>
                    } />
                    <Route path="profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
