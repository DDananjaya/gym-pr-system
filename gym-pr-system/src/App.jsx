import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GymProvider, GymContext } from './context/GymContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TopPRs from './pages/TopPRs';
import About from './pages/About';
import Home from './pages/Home'; // Add import at top



const ProtectedRoute = ({ children }) => {
    const { user } = React.useContext(GymContext);
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <GymProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<div className="container"><h1>Welcome to Gym PR Tracker</h1></div>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/top10" element={<TopPRs />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </GymProvider>
    );
}

export default App;