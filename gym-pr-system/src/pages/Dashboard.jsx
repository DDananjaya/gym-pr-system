import React, { useContext, useState } from 'react';
import { GymContext } from '../context/GymContext';
import '../CSS/Dashboard.css';

const Dashboard = () => {
    const { members, categories, addMember, deleteMember, addPR, deletePR, addCategory, deleteCategory } = useContext(GymContext);

    // Local state for forms
    const [newMember, setNewMember] = useState({ name: '', age: '', weightClass: '', image: '' });
    const [prForm, setPrForm] = useState({ memberId: '', weight: '', category: '' });
    const [newCat, setNewCat] = useState('');

    // Handle Image Upload (Convert to Base64 to save string in "DB")
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewMember({ ...newMember, image: reader.result });
        };
        if (file) reader.readAsDataURL(file);
    };

    const handleAddMember = () => {
        if (!newMember.name) return alert("Name required");
        addMember(newMember);
        setNewMember({ name: '', age: '', weightClass: '', image: '' });
    };

    const handleAddPR = () => {
        if (!prForm.memberId || !prForm.weight) return alert("Details required");
        const member = members.find(m => m.id === parseInt(prForm.memberId));
        addPR(parseInt(prForm.memberId), {
            weight: parseFloat(prForm.weight),
            category: prForm.category,
            weightClass: member.weightClass
        });
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>

            {/* 1. Category Management */}
            <div className="card" style={{ borderLeftColor: 'var(--pastel-purple)' }}>
                <h3>Manage Categories</h3>
                <div style={{ display: 'flex' }}>
                    <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="New Category (e.g. Bench)" />
                    <button className="btn btn-success" onClick={() => { addCategory(newCat); setNewCat(''); }}>Add</button>
                </div>
                <div style={{ marginTop: '10px' }}>
                    {categories.map(c => (
                        <span key={c} style={{ background: '#eee', padding: '5px 10px', margin: '5px', borderRadius: '15px', display: 'inline-block' }}>
               {c} <span style={{color:'red', cursor:'pointer', marginLeft:'5px'}} onClick={() => deleteCategory(c)}>x</span>
             </span>
                    ))}
                </div>
            </div>

            {/* 2. Add Member */}
            <div className="card">
                <h3>Add New Member</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <input placeholder="Name" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} />
                    <input placeholder="Age" type="number" value={newMember.age} onChange={e => setNewMember({...newMember, age: e.target.value})} />
                    <input placeholder="Weight Class (kg)" value={newMember.weightClass} onChange={e => setNewMember({...newMember, weightClass: e.target.value})} />
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                <button className="btn btn-primary" onClick={handleAddMember}>Register Member</button>
            </div>

            {/* 3. Add PR */}
            <div className="card" style={{ borderLeftColor: 'var(--pastel-green)' }}>
                <h3>Log a PR</h3>
                <select onChange={e => setPrForm({...prForm, memberId: e.target.value})}>
                    <option value="">Select Member</option>
                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
                <select onChange={e => setPrForm({...prForm, category: e.target.value})}>
                    <option value="">Select Lift</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="number" placeholder="Weight (kg)" onChange={e => setPrForm({...prForm, weight: e.target.value})} />
                <button className="btn btn-success" onClick={handleAddPR}>Save PR</button>
            </div>

            {/* 4. Member Database (FIX APPLIED HERE) */}
            <div className="card table-card">
                <h3>Member Database</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Pic</th>
                        <th>Details</th>
                        <th>PR History</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map(m => (
                        <tr key={m.id}>
                            <td>
                                {m.image ? <img src={m.image} className="profile-img" alt="profile"/> : <div className="profile-img" style={{background:'#ccc'}}></div>}
                            </td>
                            <td>
                                <strong>{m.name}</strong><br/>
                                Age: {m.age} | Class: {m.weightClass}kg
                            </td>
                            <td>
                                {m.prs.map(pr => (
                                    <div key={pr.id} style={{fontSize: '0.9em'}}>
                                        <strong>{pr.category}:</strong> {pr.weight}kg
                                        <button onClick={() => deletePR(m.id, pr.id)} style={{border:'none', color:'red', cursor:'pointer'}}>x</button>
                                    </div>
                                ))}
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteMember(m.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;