import { useState, useEffect, Suspense } from "react"
import { Link, Await, useLoaderData } from "react-router"
import { getHostVans, getUserProfile } from "../../api"
import { requireAuth } from "../../utils"
import { useAuth } from "../../context/AuthContext"

export async function loader({ request }) {
    await requireAuth(request)
    // In React Router v7, return promises directly without defer
    return { vans: getHostVans() }
}

export default function Dashboard() {
    const loaderData = useLoaderData()
    const { currentUser } = useAuth()
    const [userProfile, setUserProfile] = useState(null)

    useEffect(() => {
        if (currentUser) {
            getUserProfile(currentUser.uid)
                .then(profile => setUserProfile(profile))
                .catch(err => console.error("Error fetching user profile:", err))
        }
    }, [currentUser])

    function renderVanElements(vans) {
        const hostVansEls = vans.slice(0, 3).map((van) => (
            <div className="dashboard-van-item" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="dashboard-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                    <div className="dashboard-van-stats">
                        <span><strong>12</strong> bookings</span>
                        <span><strong>4.8</strong> rating</span>
                    </div>
                </div>
                <Link to={`vans/${van.id}`} className="dashboard-van-edit">Edit</Link>
            </div>
        ))

        return (
            <div className="dashboard-vans-list">
                {hostVansEls}
            </div>
        )
    }

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <h1>Welcome back{userProfile?.name ? `, ${userProfile.name}` : ''}!</h1>
                <p>Here's what's happening with your vans today</p>
            </div>

            {/* Stats Cards */}
            <div className="dashboard-stats-grid">
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 17L12 22L22 17" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="stat-badge positive">+12%</span>
                    </div>
                    <p className="stat-label">Total Earnings</p>
                    <h2 className="stat-value">$12,450</h2>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="3" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="stat-badge positive">+8%</span>
                    </div>
                    <p className="stat-label">Profile Views</p>
                    <h2 className="stat-value">2,847</h2>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="stat-badge positive">New reviews: 12</span>
                    </div>
                    <p className="stat-label">Rating</p>
                    <h2 className="stat-value">5.0</h2>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-main-grid">
                {/* Left Column */}
                <div className="dashboard-left-column">
                    {/* Income Section */}
                    <section className="dashboard-income-card">
                        <div className="income-header">
                            <div className="income-info">
                                <div className="income-label">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p>Income last <span className="underlined">30 days</span></p>
                                </div>
                                <h2 className="income-amount">$2,260</h2>
                                <p className="income-change">+18% from last month</p>
                            </div>
                            <Link to="income" className="details-link">View Details</Link>
                        </div>
                        <div className="income-chart">
                            <div className="chart-bar" style={{height: '48px'}}></div>
                            <div className="chart-bar" style={{height: '64px'}}></div>
                            <div className="chart-bar" style={{height: '40px'}}></div>
                            <div className="chart-bar" style={{height: '80px'}}></div>
                            <div className="chart-bar" style={{height: '96px'}}></div>
                        </div>
                    </section>

                    {/* Listed Vans Section */}
                    <section className="dashboard-vans-section">
                        <div className="section-header">
                            <h2>Your listed vans</h2>
                            <Link to="vans" className="view-all-link">View all</Link>
                        </div>
                        <Suspense fallback={<div className="loading">Loading...</div>}>
                            <Await resolve={loaderData.vans}>{renderVanElements}</Await>
                        </Suspense>
                    </section>
                </div>

                {/* Right Column */}
                <div className="dashboard-right-column">
                    {/* Review Score */}
                    <section className="dashboard-review-card">
                        <div className="review-header">
                            <h3>Review score</h3>
                            <Link to="reviews" className="details-link-small">Details</Link>
                        </div>
                        <div className="review-score">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <path d="M32 8l7.09 14.36L56 25.09l-12 11.69 2.83 16.5L32 45.36l-14.83 7.92 2.83-16.5-12-11.69 16.91-2.73L32 8z" fill="#FF8C38"/>
                            </svg>
                            <div className="review-score-text">
                                <span className="score-number">5.0</span>
                                <span className="score-suffix">/5</span>
                            </div>
                        </div>
                        <div className="review-breakdown">
                            <div className="review-row">
                                <span className="review-stars">5★</span>
                                <div className="review-bar">
                                    <div className="review-bar-fill" style={{width: '95%'}}></div>
                                </div>
                                <span className="review-percent">95%</span>
                            </div>
                            <div className="review-row">
                                <span className="review-stars">4★</span>
                                <div className="review-bar">
                                    <div className="review-bar-fill" style={{width: '5%'}}></div>
                                </div>
                                <span className="review-percent">5%</span>
                            </div>
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section className="dashboard-quick-actions">
                        <h3>Quick Actions</h3>
                        <div className="actions-list">
                            <button className="action-btn primary" onClick={() => {}}>Add new van</button>
                            <button className="action-btn secondary" onClick={() => {}}>View bookings</button>
                            <button className="action-btn secondary" onClick={() => {}}>Messages</button>
                        </div>
                    </section>

                    {/* Recent Activity */}
                    <section className="dashboard-recent-activity">
                        <h3>Recent Activity</h3>
                        <div className="activity-list">
                            <div className="activity-item">
                                <span className="activity-dot active"></span>
                                <div className="activity-content">
                                    <p className="activity-text">New booking confirmed</p>
                                    <p className="activity-time">2 hours ago</p>
                                </div>
                            </div>
                            <div className="activity-item">
                                <span className="activity-dot active"></span>
                                <div className="activity-content">
                                    <p className="activity-text">Payment received</p>
                                    <p className="activity-time">5 hours ago</p>
                                </div>
                            </div>
                            <div className="activity-item">
                                <span className="activity-dot"></span>
                                <div className="activity-content">
                                    <p className="activity-text">New review posted</p>
                                    <p className="activity-time">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
