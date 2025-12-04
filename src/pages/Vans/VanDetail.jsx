import React from "react"
import { Link, useParams, useLocation, useLoaderData } from "react-router"
import { getVan } from "../../api"

export function loader({ params }) {
    return getVan(params.id)
}

export default function VanDetail() {
    const location = useLocation()
    const van = useLoaderData()

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6H2M2 6L6 10M2 6L6 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back to all vans</span>
            </Link>

            <div className="van-detail-content">
                <div className="van-detail-images">
                    <div className="van-detail-main-image">
                        <img src={van.imageUrl} alt={van.name} />
                    </div>
                    <div className="van-detail-thumbnail-grid">
                        <div className="van-detail-thumbnail">
                            <img src={van.imageUrl} alt={`${van.name} view 1`} />
                        </div>
                        <div className="van-detail-thumbnail">
                            <img src={van.imageUrl} alt={`${van.name} view 2`} />
                        </div>
                        <div className="van-detail-thumbnail">
                            <img src={van.imageUrl} alt={`${van.name} view 3`} />
                        </div>
                    </div>
                </div>

                <div className="van-detail-info">
                    <span className={`van-type-badge ${van.type}`}>
                        {van.type}
                    </span>
                    <h1>{van.name}</h1>
                    <div className="van-detail-price">
                        <span className="price">${van.price}</span>
                        <span className="period">/day</span>
                    </div>

                    <div className="van-detail-amenities">
                        <h3>Amenities</h3>
                        <div className="amenities-grid">
                            <div className="amenity-item">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6H16M4 10H16M4 14H10" stroke="#161616" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                <span>Sleeps 2-4</span>
                            </div>
                            <div className="amenity-item">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 14L3 10C3 9.44772 3.44772 9 4 9H16C16.5523 9 17 9.44772 17 10V14M6 17V14M14 17V14M2 14H18M6 9V7C6 5.89543 6.89543 5 8 5H12C13.1046 5 14 5.89543 14 7V9" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Queen Bed</span>
                            </div>
                            <div className="amenity-item">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 5H17V15H3V5Z" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 8V12M13 8V12" stroke="#161616" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                <span>Kitchenette</span>
                            </div>
                            <div className="amenity-item">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2C10 2 8 4 8 7C8 8.65685 9.34315 10 11 10C12.6569 10 14 8.65685 14 7C14 4 12 2 12 2M6 11C6 11 4 13 4 16C4 17.6569 5.34315 19 7 19C8.65685 19 10 17.6569 10 16M14 11C14 11 16 13 16 16C16 17.6569 14.6569 19 13 19C11.3431 19 10 17.6569 10 16" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>WiFi Ready</span>
                            </div>
                        </div>
                    </div>

                    <div className="van-detail-description">
                        <h3>Description</h3>
                        <p>{van.description}</p>
                    </div>

                    <div className="van-detail-features">
                        <h3>Features</h3>
                        <ul>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10L8 13L15 6" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Solar panels for off-grid power</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10L8 13L15 6" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Water tank and filtration system</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10L8 13L15 6" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Composting toilet</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10L8 13L15 6" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Full kitchen setup</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10L8 13L15 6" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Heating and cooling system</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10L8 13L15 6" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Plenty of storage space</span>
                            </li>
                        </ul>
                    </div>

                    <div className="van-detail-actions">
                        <button className="btn-rent">Rent this van</button>
                        <button className="btn-contact">Contact host</button>
                    </div>
                </div>
            </div>

        </div>
    )
}