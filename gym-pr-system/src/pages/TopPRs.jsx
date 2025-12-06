import React, { useContext, useState } from 'react';
import { GymContext } from '../context/GymContext';

const TopPRs = () => {
    const { members, categories } = useContext(GymContext);
    const [selectedCat, setSelectedCat] = useState(categories[0] || '');

    const getTop10 = () => {
        let allPRs = [];


        members.forEach(member => {
            member.prs.forEach(pr => {
                if (pr.category === selectedCat) {
                    allPRs.push({
                        memberName: member.name,
                        memberImg: member.image,
                        weight: pr.weight,
                        weightClass: pr.weightClass
                    });
                }
            });
        });

        return allPRs.sort((a, b) => b.weight - a.weight).slice(0, 10);
    };

    const topList = getTop10();

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center', color: 'var(--pastel-blue)' }}>🏆 Hall of Fame</h1>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <label>Select Category: </label>
                <select
                    value={selectedCat}
                    onChange={e => setSelectedCat(e.target.value)}
                    style={{ width: 'auto' }}
                >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
                {topList.length > 0 ? topList.map((entry, index) => (
                    <div key={index} className="card" style={{ display: 'flex', alignItems: 'center', borderLeft: `5px solid ${index === 0 ? 'gold' : 'var(--pastel-blue)'}` }}>
                        <h1 style={{ margin: '0 20px', color: '#ccc' }}>#{index + 1}</h1>
                        {entry.memberImg && <img src={entry.memberImg} className="profile-img" alt="profile" style={{ marginRight: '20px' }} />}
                        <div>
                            <h2 style={{ margin: 0 }}>{entry.memberName}</h2>
                            <p style={{ margin: 0, color: '#666' }}>
                                Lifted: <strong>{entry.weight} kg</strong> (Weight Class: {entry.weightClass})
                            </p>
                        </div>
                    </div>
                )) : <p style={{textAlign:'center'}}>No records found for this category.</p>}
            </div>
        </div>
    );
};

export default TopPRs;






