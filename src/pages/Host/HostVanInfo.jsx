import React from "react"
import { useOutletContext } from "react-router"
import "../../css/pages/host/host-van-info.css"

export default function HostVanInfo() {
    const { currentVan } = useOutletContext()

    return (
        <section className="host-van-info">
            <div className="info-section">
                <h3 className="info-heading">Name</h3>
                <p className="info-text">{currentVan.name}</p>
            </div>

            <div className="info-section">
                <h3 className="info-heading">Category</h3>
                <p className="info-text">{currentVan.type}</p>
            </div>

            <div className="info-section">
                <h3 className="info-heading">Description</h3>
                <p className="info-text">{currentVan.description}</p>
            </div>

            <div className="info-section">
                <h3 className="info-heading">Specifications</h3>
                <div className="specifications-grid">
                    <div className="spec-item">
                        <span className="spec-label">year</span>
                        <p className="spec-value">2021</p>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">make</span>
                        <p className="spec-value">Ford</p>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">model</span>
                        <p className="spec-value">Transit</p>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">capacity</span>
                        <p className="spec-value">4 passengers</p>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">transmission</span>
                        <p className="spec-value">Automatic</p>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">fuel Type</span>
                        <p className="spec-value">Diesel</p>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h3 className="info-heading">Visibility</h3>
                <p className="info-text">Public</p>
            </div>
        </section>
    )
}