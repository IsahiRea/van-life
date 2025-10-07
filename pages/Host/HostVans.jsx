import React from "react"
import { Link, useLoaderData, defer, Await } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ vans: getHostVans() })
}

export default function HostVans() {
    const dataPromise = useLoaderData()

    function renderVanElements(vans) {
        const hostVansEls = vans.map(van => (
            <div className="host-vans-card" key={van.id}>
                <div className="host-vans-card-image">
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <span className="host-vans-badge">Active</span>
                </div>
                <div className="host-vans-card-content">
                    <div className="host-vans-card-info">
                        <h3>{van.name}</h3>
                        <div className="host-vans-card-price">
                            <span className="price">${van.price}</span>
                            <span className="period">/day</span>
                        </div>
                    </div>
                    <div className="host-vans-card-stats">
                        <div className="stat-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1l2.09 4.26L15 6.09l-3.5 3.41.83 4.88L8 12.36l-4.33 2.02.83-4.88L1 6.09l4.91-.83L8 1z" fill="#FF8C38"/>
                            </svg>
                            <span className="stat-value">{van.type === "simple" ? "4.9" : van.type === "luxury" ? "5" : "4.8"}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14 2H12V1C12 0.4 11.6 0 11 0C10.4 0 10 0.4 10 1V2H6V1C6 0.4 5.6 0 5 0C4.4 0 4 0.4 4 1V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V7H14V14ZM2 5V4H14V5H2Z" fill="#4D4D4D"/>
                            </svg>
                            <span className="stat-label">{van.type === "simple" ? "24" : van.type === "luxury" ? "18" : "31"} bookings</span>
                        </div>
                    </div>
                    <div className="host-vans-card-actions">
                        <Link to={van.id} className="host-vans-edit-btn">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25a1.75 1.75 0 0 1 .445-.758l8.61-8.61Z" fill="#161616"/>
                            </svg>
                            Edit
                        </Link>
                        <button className="host-vans-more-btn" onClick={() => {}}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="3" r="1.5" fill="#161616"/>
                                <circle cx="8" cy="8" r="1.5" fill="#161616"/>
                                <circle cx="8" cy="13" r="1.5" fill="#161616"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        ))

        return (
            <div className="host-vans-grid">
                {hostVansEls}
            </div>
        )
    }

    return (
        <div className="host-vans-container">
            <div className="host-vans-header">
                <div className="host-vans-header-text">
                    <h1>Your listed vans</h1>
                    <p>Manage and monitor your fleet performance</p>
                </div>
                <button className="host-vans-add-btn" onClick={() => {}}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 5V15M5 10H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add New Van
                </button>
            </div>
            <React.Suspense fallback={<div className="loading">Loading vans...</div>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
            </React.Suspense>
        </div>
    )
}
