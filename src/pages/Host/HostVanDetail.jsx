import { useParams, Link, NavLink, Outlet, useLoaderData } from "react-router"
import { getVan } from "../../lib/api"
import { requireAuth } from "../../lib/utils"

export async function loader({ params, request }) {
    await requireAuth(request)
    return getVan(params.id)
}

export default function HostVanDetail() {
    const currentVan = useLoaderData()

    return (
        <section className="host-van-detail-container">
            <Link
                to=".."
                relative="path"
                className="host-van-detail-back-link"
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M7.5 10.5L3 6L7.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back to all vans</span>
            </Link>

            <div className="host-van-detail-card">
                <div className="host-van-detail-header">
                    <div className="host-van-detail-image">
                        <img src={currentVan.imageUrl} alt={currentVan.name} />
                    </div>
                    <div className="host-van-detail-info">
                        <div className="host-van-detail-title-section">
                            <span className={`host-van-type-badge van-type-${currentVan.type}`}>
                                {currentVan.type}
                            </span>
                            <h1 className="host-van-detail-title">{currentVan.name}</h1>
                            <div className="host-van-detail-price">
                                <span className="price-amount">${currentVan.price}</span>
                                <span className="price-period">/day</span>
                            </div>
                        </div>
                        <div className="host-van-detail-meta-grid">
                            <div className="host-van-meta-item">
                                <div className="meta-header">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 9.33333C9.47276 9.33333 10.6667 8.13943 10.6667 6.66667C10.6667 5.19391 9.47276 4 8 4C6.52724 4 5.33333 5.19391 5.33333 6.66667C5.33333 8.13943 6.52724 9.33333 8 9.33333Z" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 12C10.6667 12 12.6667 10 12.6667 8C12.6667 6 10.6667 4 8 4C5.33333 4 3.33333 6 3.33333 8C3.33333 10 5.33333 12 8 12Z" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="meta-label">Visibility</span>
                                </div>
                                <p className="meta-value">Public</p>
                            </div>
                            <div className="host-van-meta-item">
                                <div className="meta-header">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M10.6667 1.33333V4" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M5.33333 1.33333V4" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2 6.66667H14" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="meta-label">Year</span>
                                </div>
                                <p className="meta-value">2021</p>
                            </div>
                            <div className="host-van-meta-item">
                                <div className="meta-header">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M5.33333 8C5.33333 8 6.33333 9.33333 8 9.33333C9.66667 9.33333 10.6667 8 10.6667 8" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="meta-label">Capacity</span>
                                </div>
                                <p className="meta-value">4 passengers</p>
                            </div>
                            <div className="host-van-meta-item">
                                <div className="meta-header">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 4V8L10.6667 9.33333" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="meta-label">Type</span>
                                </div>
                                <p className="meta-value">{currentVan.type}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="host-van-detail-tabs-card">
                <nav className="host-van-detail-tabs">
                    <NavLink
                        to="."
                        end
                        className={({ isActive }) => isActive ? "tab-link active" : "tab-link"}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 6L8 2L2 6V13.3333C2 13.6869 2.14048 14.026 2.39052 14.2761C2.64057 14.5262 2.97971 14.6667 3.33333 14.6667H12.6667C13.0203 14.6667 13.3594 14.5262 13.6095 14.2761C13.8595 14.026 14 13.6869 14 13.3333V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 14.6667V8H10V14.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        className={({ isActive }) => isActive ? "tab-link active" : "tab-link"}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 4V8L10.6667 9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        className={({ isActive }) => isActive ? "tab-link active" : "tab-link"}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M14 10L11 7L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Photos
                    </NavLink>
                </nav>
                <div className="host-van-detail-content">
                    <Outlet context={{ currentVan }} />
                </div>
            </div>
        </section>
    )
}
