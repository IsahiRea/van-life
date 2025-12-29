import bgImg from "../assets/images/about-hero.png"
import interiorImg from "../assets/images/about-interior.png"
import { Link } from "react-router"

export default function About() {
    return (
        <div className="about-page">
            {/* Hero Section - Split Layout */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <div className="about-hero-text">
                        <span className="about-hero-badge">Our Story</span>
                        <h1 className="about-hero-title">
                            Born from a Love of
                            <span className="about-hero-accent">the Open Road</span>
                        </h1>
                        <p className="about-hero-subtitle">
                            We're not just a rental company — we're fellow travelers who believe
                            the journey matters as much as the destination.
                        </p>
                        <div className="about-hero-stats">
                            <div className="about-hero-stat">
                                <span className="about-hero-stat-value">5+</span>
                                <span className="about-hero-stat-label">Years of Adventure</span>
                            </div>
                            <div className="about-hero-stat">
                                <span className="about-hero-stat-value">10K+</span>
                                <span className="about-hero-stat-label">Happy Travelers</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-hero-media">
                    <div className="about-hero-image-wrapper">
                        <img src={bgImg} className="about-hero-image" alt="Person enjoying van life on a scenic mountain road" />
                    </div>
                    <div className="about-hero-decoration"></div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-mission">
                <div className="about-mission-content">
                    <div className="about-mission-text">
                        <span className="section-label">Our Mission</span>
                        <h2 className="about-mission-title">
                            Don't squeeze in a sedan when you could relax in a van.
                        </h2>
                        <div className="about-mission-body">
                            <p>
                                Our mission is to enliven your road trip with the perfect travel van rental.
                                Our vans are recertified before each trip to ensure your travel plans can go
                                off without a hitch.
                            </p>
                            <p className="about-mission-aside">
                                (Hitch costs extra though)
                            </p>
                            <p>
                                Our team is full of vanlife enthusiasts who know firsthand the magic of
                                touring the world on 4 wheels. We believe that adventure shouldn't be
                                complicated — that's why we've made it our mission to provide you with
                                the best vans, the best service, and the best support for your journey.
                            </p>
                        </div>
                    </div>
                    <div className="about-mission-media">
                        <div className="about-mission-image-wrapper">
                            <img src={interiorImg} alt="Cozy van interior" className="about-mission-image" />
                            <div className="about-mission-image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="about-features">
                <div className="about-features-header">
                    <span className="section-label">Why Choose Us</span>
                    <h2 className="about-features-title">The #VANLIFE Promise</h2>
                    <p className="about-features-subtitle">
                        Every journey with us comes with these guarantees
                    </p>
                </div>
                <div className="about-features-grid">
                    <div className="about-feature-card">
                        <div className="about-feature-number">01</div>
                        <div className="about-feature-check">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M20 6L9 17l-5-5"/>
                            </svg>
                        </div>
                        <h3 className="about-feature-title">Certified & Inspected</h3>
                        <p className="about-feature-text">All vans undergo rigorous safety checks and full certification before every single trip.</p>
                    </div>
                    <div className="about-feature-card">
                        <div className="about-feature-number">02</div>
                        <div className="about-feature-check">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M20 6L9 17l-5-5"/>
                            </svg>
                        </div>
                        <h3 className="about-feature-title">24/7 Road Support</h3>
                        <p className="about-feature-text">Our dedicated team of vanlife enthusiasts is always just a call away, anywhere you roam.</p>
                    </div>
                    <div className="about-feature-card">
                        <div className="about-feature-number">03</div>
                        <div className="about-feature-check">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M20 6L9 17l-5-5"/>
                            </svg>
                        </div>
                        <h3 className="about-feature-title">Flexible Booking</h3>
                        <p className="about-feature-text">Plans change — we get it. Enjoy free cancellation up to 48 hours before your pickup.</p>
                    </div>
                    <div className="about-feature-card">
                        <div className="about-feature-number">04</div>
                        <div className="about-feature-check">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M20 6L9 17l-5-5"/>
                            </svg>
                        </div>
                        <h3 className="about-feature-title">Expert Guidance</h3>
                        <p className="about-feature-text">Get insider tips on routes, camping spots, and hidden gems from our experienced team.</p>
                    </div>
                </div>
            </section>

            {/* Impact Stats Section */}
            <section className="about-impact">
                <div className="about-impact-bg"></div>
                <div className="about-impact-content">
                    <div className="about-impact-header">
                        <span className="section-label section-label--light">Our Impact</span>
                        <h2 className="about-impact-title">Numbers That Tell Our Story</h2>
                    </div>
                    <div className="about-impact-grid">
                        <div className="about-stat">
                            <div className="about-stat-value">10K+</div>
                            <div className="about-stat-label">Happy Travelers</div>
                            <div className="about-stat-detail">and counting every day</div>
                        </div>
                        <div className="about-stat">
                            <div className="about-stat-value">500+</div>
                            <div className="about-stat-label">Vans Available</div>
                            <div className="about-stat-detail">across the country</div>
                        </div>
                        <div className="about-stat">
                            <div className="about-stat-value">5</div>
                            <div className="about-stat-label">Years Strong</div>
                            <div className="about-stat-detail">of trusted service</div>
                        </div>
                        <div className="about-stat">
                            <div className="about-stat-value">4.9</div>
                            <div className="about-stat-label">Star Rating</div>
                            <div className="about-stat-detail">from verified reviews</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values">
                <div className="about-values-intro">
                    <span className="section-label">Our Values</span>
                    <h2 className="about-values-title">Built by Travelers, for Travelers</h2>
                    <p className="about-values-subtitle">
                        Every member of our team has lived the vanlife experience.
                        We know what matters because we've been there.
                    </p>
                </div>
                <div className="about-values-grid">
                    <article className="about-value-card about-value-card--accent">
                        <div className="about-value-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                        </div>
                        <h3 className="about-value-title">Passion First</h3>
                        <p className="about-value-text">We love what we do, and it shows in every interaction. Your adventure is our adventure.</p>
                    </article>
                    <article className="about-value-card">
                        <div className="about-value-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                            </svg>
                        </div>
                        <h3 className="about-value-title">Quality Always</h3>
                        <p className="about-value-text">Every van meets our exacting standards for safety, comfort, and reliability. No exceptions.</p>
                    </article>
                    <article className="about-value-card">
                        <div className="about-value-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                        </div>
                        <h3 className="about-value-title">Community Driven</h3>
                        <p className="about-value-text">We're building more than a business — we're fostering a community of adventurers.</p>
                    </article>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="about-cta-content">
                    <span className="section-label">Start Your Journey</span>
                    <h2 className="about-cta-title">
                        Your destination is waiting.
                        <span>Your van is ready.</span>
                    </h2>
                    <p className="about-cta-text">
                        Join thousands of travelers who have discovered the freedom and joy of vanlife.
                        The open road is calling — will you answer?
                    </p>
                    <div className="about-cta-actions">
                        <Link to="/vans" className="about-cta-btn-primary">
                            Explore Our Vans
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                        <Link to="/signup" className="about-cta-btn-secondary">Become a Host</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
