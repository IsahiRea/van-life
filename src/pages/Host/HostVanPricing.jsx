import React from "react"
import { useOutletContext } from "react-router-dom"
import "../../css/pages/host/host-van-pricing.css"

export default function HostVanPricing() {
    const { currentVan } = useOutletContext()

    return (
        <section className="host-van-pricing">
            {/* Base Rate */}
            <div className="pricing-section">
                <h3 className="pricing-heading">Base Rate</h3>
                <div className="pricing-base-rate">
                    <span className="price-large">${currentVan.price}.00</span>
                    <span className="price-period">/day</span>
                </div>
            </div>

            {/* Pricing Tiers */}
            <div className="pricing-section">
                <h3 className="pricing-heading">Pricing Tiers</h3>
                <div className="pricing-tiers-grid">
                    <div className="pricing-tier-card">
                        <div className="tier-header">
                            <div className="tier-icon">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="#FF8C38" strokeWidth="1.5"/>
                                    <path d="M7 4V2M13 4V2" stroke="#FF8C38" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M3 8H17" stroke="#FF8C38" strokeWidth="1.5"/>
                                </svg>
                            </div>
                            <h4 className="tier-title">Weekly</h4>
                        </div>
                        <p className="tier-price">$360</p>
                        <p className="tier-details">7 days • $51.43/day</p>
                    </div>

                    <div className="pricing-tier-card">
                        <div className="tier-header">
                            <div className="tier-icon">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="#FF8C38" strokeWidth="1.5"/>
                                    <path d="M7 4V2M13 4V2" stroke="#FF8C38" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M3 8H17" stroke="#FF8C38" strokeWidth="1.5"/>
                                </svg>
                            </div>
                            <h4 className="tier-title">Monthly</h4>
                        </div>
                        <p className="tier-price">$1440</p>
                        <p className="tier-details">30 days • $48.00/day</p>
                    </div>

                    <div className="pricing-tier-card featured">
                        <div className="tier-header">
                            <div className="tier-icon">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2L12.5 7.5L18 8.5L14 13L15 18.5L10 16L5 18.5L6 13L2 8.5L7.5 7.5L10 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h4 className="tier-title">Custom</h4>
                        </div>
                        <p className="tier-price">Negotiable</p>
                        <p className="tier-details">Contact for long-term rates</p>
                    </div>
                </div>
            </div>

            {/* Discounts */}
            <div className="pricing-section">
                <h3 className="pricing-heading">Discounts</h3>
                <div className="pricing-discounts">
                    <div className="discount-item">
                        <div className="discount-info">
                            <h4 className="discount-title">Weekend Special</h4>
                            <p className="discount-description">Friday - Sunday bookings</p>
                        </div>
                        <span className="discount-badge">10% OFF</span>
                    </div>

                    <div className="discount-item">
                        <div className="discount-info">
                            <h4 className="discount-title">Weekly Discount</h4>
                            <p className="discount-description">7+ days rental</p>
                        </div>
                        <span className="discount-badge">15% OFF</span>
                    </div>

                    <div className="discount-item">
                        <div className="discount-info">
                            <h4 className="discount-title">Monthly Discount</h4>
                            <p className="discount-description">30+ days rental</p>
                        </div>
                        <span className="discount-badge">20% OFF</span>
                    </div>
                </div>
            </div>
        </section>
    )
}