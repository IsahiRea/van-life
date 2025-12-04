
export default function Income() {
    const transactionsData = [
        { amount: 720, date: "1/12/22", id: "1", van: "Modest Explorer" },
        { amount: 560, date: "10/11/22", id: "2", van: "Beach Bum" },
        { amount: 980, date: "23/11/22", id: "3", van: "Green Wonder" },
    ]

    // Sample chart data - heights represent relative values
    const chartData = [
        { month: "Jul", value: 0, amount: "$3,250" },
        { month: "Aug", value: 0, amount: "$1,250" },
        { month: "Sep", value: 0, amount: "$2,500" },
        { month: "Oct", value: 0, amount: "$2,250" },
        { month: "Nov", value: 40, amount: "$1,400" },
        { month: "Dec", value: 15, amount: "$500" },
    ]

    return (
        <section className="income-container">
            <div className="income-header">
                <h1>Income</h1>
                <p className="income-last-period">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1Z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 4V8L11 10" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Last <span className="period-text">30 days</span>
                </p>
            </div>

            {/* Total Earnings Card */}
            <div className="total-earnings-card">
                <div className="earnings-content">
                    <div className="earnings-info">
                        <p className="earnings-label">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 7L8.5 11.5L6.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                                <path d="M10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                            </svg>
                            Total Earnings
                        </p>
                        <h2 className="earnings-amount">$2,260</h2>
                        <div className="earnings-badge">
                            <span className="badge-dot"></span>
                            <span className="badge-text">+18% from last month</span>
                        </div>
                    </div>
                    <div className="earnings-icon">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 8C18.745 8 8 18.745 8 32C8 45.255 18.745 56 32 56C45.255 56 56 45.255 56 32C56 18.745 45.255 8 32 8Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                            <path d="M32 20V32L40 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                            <path d="M32 16V12M32 52V48M48 32H52M12 32H16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Monthly Overview Chart */}
            <div className="monthly-overview-card">
                <div className="overview-header">
                    <h3 className="overview-title">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2V18H18" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 14L10 10L14 12L18 6" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Monthly Overview
                    </h3>
                    <div className="overview-dropdown">
                        <span>Last 6 months</span>
                    </div>
                </div>

                <div className="chart-container">
                    <div className="chart-y-axis">
                        <span>$5k</span>
                        <span>$4k</span>
                        <span>$3k</span>
                        <span>$2k</span>
                        <span>$1k</span>
                        <span>$0</span>
                    </div>

                    <div className="chart-area">
                        <div className="chart-grid">
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                        </div>

                        <div className="chart-bars">
                            {chartData.map((data) => (
                                <div key={data.month} className="chart-bar-wrapper">
                                    <div
                                        className={`chart-bar ${data.value > 0 ? 'active' : ''}`}
                                        style={{ height: `${data.value}%` }}
                                    ></div>
                                    <span className="chart-label">{data.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="recent-transactions-section">
                <div className="transactions-header">
                    <h3 className="transactions-title">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="14" height="14" rx="2" stroke="#161616" strokeWidth="2"/>
                            <path d="M7 7H13M7 10H13M7 13H10" stroke="#161616" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Recent Transactions (3)
                    </h3>
                    <p className="transactions-period">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1Z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 4V8L11 10" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Last <span>30 days</span>
                    </p>
                </div>

                <div className="transactions-list">
                    {transactionsData.map((transaction) => (
                        <div key={transaction.id} className="transaction-card">
                            <div className="transaction-info">
                                <div className="transaction-icon">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2Z" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M14 8V14L18 18" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="transaction-details">
                                    <h4 className="transaction-amount">${transaction.amount}</h4>
                                    <p className="transaction-van">{transaction.van}</p>
                                </div>
                            </div>
                            <div className="transaction-status">
                                <span className="status-badge">Completed</span>
                                <p className="transaction-date">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="4" width="10" height="9" rx="1" stroke="#8C8C8C" strokeWidth="1.5"/>
                                        <path d="M12 2V4M4 2V4M3 6H13" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                    {transaction.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
