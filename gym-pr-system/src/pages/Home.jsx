import React, { useContext, useEffect, useState } from 'react';
import { GymContext } from '../context/GymContext';
import '../CSS/Home.css'
const Home = () => {
    const { members, categories } = useContext(GymContext);
    const [records, setRecords] = useState([]);


    useEffect(() => {
        const calculatedRecords = categories.map(category => {
            let maxWeight = 0;
            let holder = null;

            members.forEach(member => {

                const memberBest = member.prs
                    .filter(pr => pr.category === category)
                    .reduce((max, pr) => (pr.weight > max ? pr.weight : max), 0);

                if (memberBest > maxWeight) {
                    maxWeight = memberBest;
                    holder = member;
                }
            });

            if (holder) {
                return {
                    category,
                    holderName: holder.name,
                    holderImage: holder.image,
                    weight: maxWeight,
                    weightClass: holder.weightClass
                };
            }
            return null;
        }).filter(record => record !== null);

        setRecords(calculatedRecords);
    }, [members, categories]);

    return (
        <div className="tv-container">
            <div className="tv-header">
                <h1>🏆 GYM RECORDS 🏆</h1>
                <p>Current All-Time Best Lifts</p>
            </div>

            <div className="records-grid">
                {records.length > 0 ? (
                    records.map((record, index) => (
                        <div key={index} className="record-card">
                            <div className="crown-icon">👑</div>
                            <div className="record-category">{record.category}</div>

                            <div className="image-wrapper">
                                {record.holderImage ? (
                                    <img src={record.holderImage} alt="Champion" />
                                ) : (
                                    <div className="placeholder-img">{record.holderName.charAt(0)}</div>
                                )}
                            </div>

                            <div className="record-details">
                                <h2 className="champion-name">{record.holderName}</h2>
                                <div className="huge-weight">{record.weight} <span className="unit">kg</span></div>
                                <div className="sub-detail">Class: {record.weightClass}kg</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', width: '100%', color: '#666' }}>
                        <h2>No Records Set Yet!</h2>
                        <p>Coaches, add some PRs to the Dashboard.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;