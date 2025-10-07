import React from "react"
import bgImg from "../assets/images/about-hero.png"
import interiorImg from "../assets/images/about-interior.png"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <div className="about-page-container">
            <div className="about-hero">
                <img src={bgImg} className="about-hero-image" />
            </div>

            <div className="about-main-content">
                <div className="about-intro">
                    <div className="about-intro-text">
                        <h1>Don't squeeze in a sedan when you could relax in a van.</h1>
                        <div className="about-mission">
                            <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.</p>
                            <p className="about-hitch">(Hitch costs extra 😉)</p>
                            <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                            <p>We believe that adventure shouldn't be complicated. That's why we've made it our mission to provide you with the best vans, the best service, and the best support for your journey.</p>
                        </div>
                    </div>
                    <div className="about-intro-media">
                        <div className="about-van-image">
                            <img src={interiorImg} alt="Van interior" />
                        </div>
                        <div className="about-why-box">
                            <h3>Why Choose Us?</h3>
                            <ul>
                                <li>
                                    <span className="checkmark">✓</span>
                                    <span>All vans are fully certified and inspected</span>
                                </li>
                                <li>
                                    <span className="checkmark">✓</span>
                                    <span>24/7 roadside assistance included</span>
                                </li>
                                <li>
                                    <span className="checkmark">✓</span>
                                    <span>Flexible booking and cancellation</span>
                                </li>
                                <li>
                                    <span className="checkmark">✓</span>
                                    <span>Experienced vanlife support team</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="about-impact">
                    <h2>Our Impact</h2>
                    <div className="about-impact-grid">
                        <div className="impact-stat">
                            <div className="impact-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <path d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z" stroke="#FF8C38" strokeWidth="2"/>
                                    <path d="M20 15C22.7614 15 25 12.7614 25 10C25 7.23858 22.7614 5 20 5C17.2386 5 15 7.23858 15 10C15 12.7614 17.2386 15 20 15Z" fill="#FF8C38"/>
                                    <path d="M27 35V31C27 28.2386 24.7614 26 22 26H18C15.2386 26 13 28.2386 13 31V35" stroke="#FF8C38" strokeWidth="2"/>
                                </svg>
                            </div>
                            <h3>10,000+</h3>
                            <p>Happy Travelers</p>
                        </div>
                        <div className="impact-stat">
                            <div className="impact-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <rect x="5" y="10" width="30" height="20" rx="2" stroke="#FF8C38" strokeWidth="2"/>
                                    <path d="M35 15L30 20L35 25V15Z" fill="#FF8C38"/>
                                    <circle cx="15" cy="20" r="3" fill="#FF8C38"/>
                                    <circle cx="25" cy="20" r="3" fill="#FF8C38"/>
                                </svg>
                            </div>
                            <h3>500+</h3>
                            <p>Vans Available</p>
                        </div>
                        <div className="impact-stat">
                            <div className="impact-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <rect x="5" y="10" width="30" height="25" rx="2" stroke="#FF8C38" strokeWidth="2"/>
                                    <path d="M5 18H35" stroke="#FF8C38" strokeWidth="2"/>
                                    <path d="M12 25H14" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M18 25H28" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <h3>5 Years</h3>
                            <p>In Business</p>
                        </div>
                        <div className="impact-stat">
                            <div className="impact-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <path d="M20 5L24.09 16.26L35 17.27L27 24.14L29.18 35L20 29.27L10.82 35L13 24.14L5 17.27L15.91 16.26L20 5Z" fill="#FF8C38"/>
                                </svg>
                            </div>
                            <h3>4.9/5</h3>
                            <p>Customer Rating</p>
                        </div>
                    </div>
                </div>

                <div className="about-cta-section">
                    <h2>Your destination is waiting.<br />Your van is ready.</h2>
                    <p>Join thousands of travelers who have discovered the freedom and joy of vanlife. Start planning your adventure today!</p>
                    <Link className="about-cta-button" to="/vans">Explore our vans</Link>
                </div>

                <div className="about-team">
                    <div className="about-team-intro">
                        <h2>Built by travelers, for travelers</h2>
                        <p>Every member of our team has lived the vanlife experience. We know what matters because we've been there.</p>
                    </div>
                    <div className="about-team-cards">
                        <div className="team-card">
                            <div className="team-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3>Passionate Team</h3>
                            <p>We love what we do and it shows in every interaction</p>
                        </div>
                        <div className="team-card">
                            <div className="team-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76489 14.1003 1.98232 16.07 2.86" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 4L12 14.01L9 11.01" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3>Quality First</h3>
                            <p>Every van meets our high standards for safety and comfort</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}