import React from 'react';
import '../CSS/About.css'
import coachImg from '../assets/coach.jpg';
import certFitness from '../assets/Ceticate/cert-fitness.jpg';
import certBody from '../assets/Ceticate/cert-bodybuilding.jpg';

const About = () => {
    return (
        <div className="tv-container" style={{ paddingTop: '40px' }}>

            <div className="tv-header">
                <h1>MEET THE MASTER</h1>
                <p>Forging Strength Since September 1, 2017</p>
            </div>

            <div className="container">

                {/* 1. Coach Profile (Centered Layout) */}
                <div className="about-grid">
                    <div className="coach-showcase">
                        <div className="glow-circle"></div>
                        <img src={coachImg} alt="Head Coach" className="coach-img-large" />
                    </div>

                    <div className="coach-details">
                        <h2>Head Coach</h2>
                        <div className="coach-real-name">R.A.S.M. Ranasinghe</div>
                        <div className="coach-full-name">RANASINGHE ARACHCHILAGE SAMITHA MAYURANGA RANASINGHE</div>

                        <p className="bio-text">
                            Dedicated to the art of bodybuilding and physical excellence.
                            With professional experience starting from our foundation on
                            <strong> September 1, 2017</strong>, my mission is to help you break your limits.
                            Whether training for competition or life, we bring science-backed
                            techniques to the gym floor.
                        </p>

                        <div className="stat-badge">
                            🏆 Est. 2017
                        </div>
                    </div>
                </div>

                {/* 2. Certifications Section */}
                <div className="cert-section">
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#444', marginBottom: '10px', textAlign: 'center' }}>
                        Professional Qualifications
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: '#667eea', margin: '0 auto' }}></div>

                    <div className="cert-grid">

                        <div className="cert-card">
                            <img src={certFitness} alt="Fitness Cert" className="cert-img" />
                            <div className="cert-title">Physical Fitness Instructor Training</div>
                            <div className="cert-issuer">National Institute of Sports Science (Ministry of Youth & Sports)</div>
                            <p style={{fontSize:'0.85rem', color:'#666', marginTop:'10px'}}>
                                Completed the intensive training course (2017-2018), awarded by the Ministry of Youth & Sports, Sri Lanka.
                            </p>
                        </div>

                        <div className="cert-card">
                            <img src={certBody} alt="Bodybuilding Cert" className="cert-img" />
                            <div className="cert-title">Bodybuilding & Exercise Physiology</div>
                            <div className="cert-issuer">IPCR - 4 Day Bodybuilding Workshop</div>
                            <p style={{fontSize:'0.85rem', color:'#666', marginTop:'10px'}}>
                                Specialized in Modern Nutritional Strategies, Supplementation Protocols, Injury Prevention, and Performance Enhancement.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;