
export default function Reviews() {
    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "December 1, 2022",
            text: "The beach bum is such as awesome van! Such as comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
            id: "1",
            vanType: "Beach Bum"
        },
        {
            rating: 5,
            name: "Sandy",
            date: "November 23, 2022",
            text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
            id: "2",
            vanType: "Modest Explorer"
        },
    ]

    return (
        <section className="reviews-container">
            <div className="reviews-header">
                <h1>Your reviews</h1>
                <p className="reviews-last-period">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1Z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 4V8L11 10" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Last <span className="period-text">30 days</span>
                </p>
            </div>

            {/* Overall Rating Card */}
            <div className="overall-rating-card">
                <div className="rating-summary">
                    <div className="rating-badge">
                        <div className="rating-badge-inner">
                            <div className="rating-score">5.0</div>
                            <div className="rating-stars">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 1l2.61 5.32 5.87.85-4.24 4.13 1 5.85L10 14.36l-5.24 2.79 1-5.85L1.52 7.17l5.87-.85L10 1z"/>
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rating-info">
                        <div className="rating-title">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <h2>Overall Rating</h2>
                        </div>
                        <p className="rating-subtitle">Based on 2 reviews</p>
                    </div>
                </div>

                <div className="rating-breakdown">
                    {[
                        { stars: 5, percent: 100 },
                        { stars: 4, percent: 0 },
                        { stars: 3, percent: 0 },
                        { stars: 2, percent: 0 },
                        { stars: 1, percent: 0 }
                    ].map(({ stars, percent }) => (
                        <div key={stars} className="rating-bar-row">
                            <div className="rating-bar-label">
                                <span>{stars}</span>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="#161616" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 1l1.82 3.68L13 5.45l-3 2.92.71 4.13L7 10.73 3.29 12.5l.71-4.13-3-2.92 4.18-.77L7 1z"/>
                                </svg>
                            </div>
                            <div className="rating-bar-bg">
                                <div
                                    className="rating-bar-fill"
                                    style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                            <div className="rating-bar-percent">{percent}%</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Reviews Section */}
            <div className="recent-reviews-section">
                <h3 className="recent-reviews-title">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="14" height="12" rx="2" stroke="#161616" strokeWidth="2"/>
                        <path d="M16 2v4M4 2v4M3 8h14" stroke="#161616" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Recent Reviews (2)
                </h3>

                <div className="reviews-list">
                    {reviewsData.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-stars">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FF8C38" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 1l2.61 5.32 5.87.85-4.24 4.13 1 5.85L10 14.36l-5.24 2.79 1-5.85L1.52 7.17l5.87-.85L10 1z"/>
                                    </svg>
                                ))}
                            </div>

                            <div className="review-header">
                                <div className="reviewer-info">
                                    <div className="reviewer-avatar">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div className="reviewer-details">
                                        <p className="reviewer-name">{review.name}</p>
                                        <p className="review-date">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1Z" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7 3.5V7L9.5 8.5" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            {review.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="review-van-badge">{review.vanType}</div>
                            </div>

                            <p className="review-text">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
