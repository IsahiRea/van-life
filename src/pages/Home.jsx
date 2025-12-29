import { Link } from "react-router"
import homeCtaImg from "../assets/images/content/home-cta.png"

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg-overlay"></div>
                <div className="hero-content">
                    <span className="hero-badge">Adventure Awaits</span>
                    <h1 className="hero-title">
                        <span className="hero-title-line">Find Your</span>
                        <span className="hero-title-accent">Perfect Van</span>
                    </h1>
                    <p className="hero-subtitle">
                        Join thousands of adventurers who've discovered freedom on the open road.
                        Premium vans, unforgettable journeys.
                    </p>
                    <div className="hero-cta-group">
                        <Link to="vans" className="hero-btn-primary">
                            Explore Vans
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                        <Link to="about" className="hero-btn-secondary">Learn More</Link>
                    </div>
                </div>
                <div className="hero-scroll-indicator">
                    <span>Scroll</span>
                    <div className="scroll-line"></div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <section className="social-proof">
                <div className="social-proof-inner">
                    <div className="proof-item">
                        <div className="proof-stars">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            ))}
                        </div>
                        <span>4.9 Rating</span>
                    </div>
                    <div className="proof-divider"></div>
                    <div className="proof-item">
                        <span className="proof-number">10,000+</span>
                        <span>Happy Travelers</span>
                    </div>
                    <div className="proof-divider"></div>
                    <div className="proof-item">
                        <span className="proof-number">500+</span>
                        <span>Vans Available</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="features-header">
                    <span className="section-label">Why Choose Us</span>
                    <h2 className="section-title">The #VANLIFE Experience</h2>
                    <p className="section-subtitle">More than rentals — we're your partners in adventure</p>
                </div>
                <div className="features-grid">
                    <article className="feature-card feature-card--accent">
                        <div className="feature-card-number">01</div>
                        <div className="feature-card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">Certified & Inspected</h3>
                        <p className="feature-card-text">Every van undergoes rigorous safety checks before each trip. Your peace of mind is our priority.</p>
                    </article>
                    <article className="feature-card">
                        <div className="feature-card-number">02</div>
                        <div className="feature-card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">Nationwide Coverage</h3>
                        <p className="feature-card-text">Pick up from hundreds of locations coast to coast. Adventure is never far away.</p>
                    </article>
                    <article className="feature-card">
                        <div className="feature-card-number">03</div>
                        <div className="feature-card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">24/7 Road Support</h3>
                        <p className="feature-card-text">Our dedicated team of vanlife enthusiasts is always just a call away, anywhere you roam.</p>
                    </article>
                    <article className="feature-card">
                        <div className="feature-card-number">04</div>
                        <div className="feature-card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">Flexible Pricing</h3>
                        <p className="feature-card-text">Transparent rates with no hidden fees. Choose daily, weekly, or monthly plans that fit your journey.</p>
                    </article>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <div className="testimonials-bg-shape"></div>
                <div className="testimonials-header">
                    <span className="section-label section-label--light">Stories from the Road</span>
                    <h2 className="section-title section-title--light">What Our Travelers Say</h2>
                </div>
                <div className="testimonials-grid">
                    <blockquote className="testimonial-card testimonial-card--featured">
                        <div className="testimonial-quote">"</div>
                        <p className="testimonial-text">This wasn't just a rental — it was the trip of a lifetime. The van was immaculate, and the team went above and beyond to make our cross-country adventure unforgettable.</p>
                        <footer className="testimonial-author">
                            <div className="testimonial-avatar">
                                <span>SM</span>
                            </div>
                            <div className="testimonial-info">
                                <cite className="testimonial-name">Sarah M.</cite>
                                <span className="testimonial-trip">California Coast Trip</span>
                            </div>
                        </footer>
                    </blockquote>
                    <blockquote className="testimonial-card">
                        <div className="testimonial-quote">"</div>
                        <p className="testimonial-text">Perfect for our family road trip. The kids loved waking up to new views every morning. Already planning our next adventure!</p>
                        <footer className="testimonial-author">
                            <div className="testimonial-avatar">
                                <span>JD</span>
                            </div>
                            <div className="testimonial-info">
                                <cite className="testimonial-name">James D.</cite>
                                <span className="testimonial-trip">National Parks Tour</span>
                            </div>
                        </footer>
                    </blockquote>
                    <blockquote className="testimonial-card">
                        <div className="testimonial-quote">"</div>
                        <p className="testimonial-text">As a solo traveler, I felt completely safe and supported. The 24/7 assistance gave me confidence to explore off the beaten path.</p>
                        <footer className="testimonial-author">
                            <div className="testimonial-avatar">
                                <span>ER</span>
                            </div>
                            <div className="testimonial-info">
                                <cite className="testimonial-name">Elena R.</cite>
                                <span className="testimonial-trip">Pacific Northwest</span>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-image-container">
                    <img src={homeCtaImg} alt="Vans parked in scenic desert landscape at sunset" className="cta-image" />
                    <div className="cta-image-overlay"></div>
                </div>
                <div className="cta-content">
                    <span className="section-label">Start Your Journey</span>
                    <h2 className="cta-title">Ready to Hit the Road?</h2>
                    <p className="cta-text">
                        Whether it's a weekend escape or a month-long odyssey, your perfect van is waiting.
                        Browse our collection and start your adventure today.
                    </p>
                    <div className="cta-buttons">
                        <Link to="vans" className="cta-btn-primary">
                            Browse All Vans
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                        <Link to="/signup" className="cta-btn-outline">Become a Host</Link>
                    </div>
                    <div className="cta-guarantee">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Free cancellation up to 48 hours before pickup</span>
                    </div>
                </div>
            </section>
        </>
    )
}
