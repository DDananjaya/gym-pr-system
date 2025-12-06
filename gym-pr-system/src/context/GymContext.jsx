import React, { createContext, useState, useEffect } from 'react';

export const GymContext = createContext(null);

export const GymProvider = ({ children }) => {
    const [members, setMembers] = useState([]);
    const [categories, setCategories] = useState([]);


    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('gym_user');
        return saved ? JSON.parse(saved) : null;
    });

    const fetchData = async () => {
        try {
            const catRes = await fetch('https://gym-pr-system.onrender.com/categories');
            const catData = await catRes.json();
            setCategories(catData);

            const memRes = await fetch('https://gym-pr-system.onrender.com/members');
            const memData = await memRes.json();
            setMembers(memData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const login = async (username, password) => {
        try {
            const res = await fetch('https://gym-pr-system.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (data.success) {
                const userData = { role: data.user.role, name: data.user.username };
                setUser(userData);
                localStorage.setItem('gym_user', JSON.stringify(userData));
                return { success: true, role: data.user.role };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('gym_user');
    };

    const addMember = async (member) => {
        await fetch('https://gym-pr-system.onrender.com/members', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(member)
        });
        await fetchData();
    };

    const deleteMember = async (id) => {
        await fetch(`https://gym-pr-system.onrender.com/members/${id}`, { method: 'DELETE' });
        setMembers(prev => prev.filter(m => m.id !== id));
    };

    const addPR = async (memberId, prData) => {
        await fetch('https://gym-pr-system.onrender.com/prs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memberId, ...prData })
        });
        await fetchData();
    };

    const deletePR = async (memberId, prId) => {
        await fetch(`https://gym-pr-system.onrender.com/prs/${prId}`, { method: 'DELETE' });
        await fetchData();
    };

    const addCategory = async (cat) => {
        await fetch('https://gym-pr-system.onrender.com/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: cat })
        });
        setCategories(prev => [...prev, cat]);
    };

    const deleteCategory = async (cat) => {
        await fetch(`https://gym-pr-system.onrender.com/categories/${cat}`, { method: 'DELETE' });
        setCategories(prev => prev.filter(c => c !== cat));
    };


    const updateMember = () => {};

    return (
        <GymContext.Provider value={{
            members, categories, user,
            login, logout,
            addMember, deleteMember, updateMember,
            addPR, deletePR,
            addCategory, deleteCategory
        }}>
            {children}
        </GymContext.Provider>
    );
};