import React from "react"
import { Link } from "react-router"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>#VANLIFE</h3>
                    <p>Your trusted partner for van rentals and adventure travel.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/vans">Browse Vans</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/host">Become a Host</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Safety Tips</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&#169; 2025 #VANLIFE - All rights reserved</p>
            </div>
        </footer>
    )
}