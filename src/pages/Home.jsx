import React from "react"
import { Link } from "react-router-dom"
import homeCtaImg from "../assets/images/home-cta.png"

export default function Home() {
    return (
        <>
            <div className="home-container">
                <h1>You got the travel plans, we got the travel vans.</h1>
                <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
                <Link to="vans">Find your van</Link>
            </div>

            <section className="home-features">
                <div className="home-features-header">
                    <h2>Why Choose #VANLIFE?</h2>
                    <p>We're more than just a rental service - we're your partners in adventure</p>
                </div>
                <div className="home-features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M35 10H5C3.89543 10 3 10.8954 3 12V28C3 29.1046 3.89543 30 5 30H35C36.1046 30 37 29.1046 37 28V12C37 10.8954 36.1046 10 35 10Z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M27 35L20 30L13 35" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h3>Certified Vans</h3>
                        <p>All vans are recertified before each trip for your safety and peace of mind</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20 10V20L25 25" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h3>Anywhere You Go</h3>
                        <p>Choose from hundreds of vans across the country, ready for your adventure</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M35 25C35 26.3261 34.4732 27.5979 33.5355 28.5355C32.5979 29.4732 31.3261 30 30 30H10C8.67392 30 7.40215 29.4732 6.46447 28.5355C5.52678 27.5979 5 26.3261 5 25V15C5 13.6739 5.52678 12.4021 6.46447 11.4645C7.40215 10.5268 8.67392 10 10 10H30C31.3261 10 32.5979 10.5268 33.5355 11.4645C34.4732 12.4021 35 13.6739 35 15V25Z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20 25C22.7614 25 25 22.7614 25 20C25 17.2386 22.7614 15 20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25Z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h3>24/7 Support</h3>
                        <p>Our team of vanlife enthusiasts is here to help you around the clock</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M20 5L24.09 16.26L35 17.27L27 24.14L29.18 35L20 29.27L10.82 35L13 24.14L5 17.27L15.91 16.26L20 5Z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h3>Top Rated</h3>
                        <p>Join thousands of happy travelers who trust us with their road trips</p>
                    </div>
                </div>
            </section>

            <section className="home-stats">
                <div className="stat-item">
                    <h3>500+</h3>
                    <p>Vans Available</p>
                </div>
                <div className="stat-item">
                    <h3>10K+</h3>
                    <p>Happy Travelers</p>
                </div>
                <div className="stat-item">
                    <h3>4.9</h3>
                    <p>Average Rating</p>
                </div>
                <div className="stat-item">
                    <h3>24/7</h3>
                    <p>Support Available</p>
                </div>
            </section>

            <section className="home-cta">
                <div className="home-cta-image">
                    <img src={homeCtaImg} alt="Vans parked in desert landscape" />
                </div>
                <div className="home-cta-content">
                    <h2>Ready for Your Next Adventure?</h2>
                    <p>Whether you're planning a weekend getaway or a cross-country journey, we have the perfect van waiting for you. Start exploring today!</p>
                    <Link to="vans" className="home-cta-button">Explore our vans</Link>
                </div>
            </section>
        </>
    )
};