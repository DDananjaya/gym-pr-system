import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GymContext } from '../context/GymContext';
import '../CSS/Navbar.css'
const Navbar = () => {
    const { user, logout } = useContext(GymContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <h2 className="logo">🏋️ GYM PR SYSTEM</h2>

            <div className="nav-links">
                <NavLink to="/" className="nav-item">
                    Home
                </NavLink>

                <NavLink to="/about" className="nav-item">
                    About Us
                </NavLink>

                <NavLink to="/top10" className="nav-item">
                    Top 10 PRs
                </NavLink>

                {user ? (
                    <>
                        <NavLink to="/dashboard" className="nav-item">
                            Dashboard
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger"
                            style={{ marginLeft: '10px', padding: '8px 20px', fontSize: '0.9rem' }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className="nav-item">
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;