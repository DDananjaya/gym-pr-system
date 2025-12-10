import React, { useState, useContext } from 'react';
import { GymContext } from '../context/GymContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(GymContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        const result = await login(username, password);

        if (result.success) {

            if (result.role === 'member') {
                navigate('/');
            } else {
                navigate('/dashboard');
            }
        } else {
            alert('Invalid Credentials!');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
            <div className="card" style={{ textAlign: 'center' }}>
                <h2 style={{color: '#333'}}>🔐 Gym Access</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;