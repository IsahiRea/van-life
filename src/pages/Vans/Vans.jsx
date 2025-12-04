import React from "react"
import {
    Link,
    useSearchParams,
    useLoaderData,
    Await
} from "react-router"
import { getVans } from "../../api"

export function loader() {
    // In React Router v7, return promises directly without defer
    return { vans: getVans() }
}

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get("type")

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function renderVanElements(vans) {
        const displayedVans = typeFilter
            ? vans.filter(van => van.type === typeFilter)
            : vans

        // Calculate type counts
        const simpleCoun = vans.filter(van => van.type === "simple").length
        const luxuryCount = vans.filter(van => van.type === "luxury").length
        const ruggedCount = vans.filter(van => van.type === "rugged").length

        // Calculate price range
        const prices = displayedVans.map(van => van.price)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)

        const vanElements = displayedVans.map(van => (
            <div key={van.id} className="van-card">
                <Link
                    to={van.id}
                    state={{
                        search: `?${searchParams.toString()}`,
                        type: typeFilter
                    }}
                    className="van-card-link"
                >
                    <div className="van-card-image">
                        <img src={van.imageUrl} alt={van.name} />
                    </div>
                    <div className="van-card-content">
                        <div className="van-card-header">
                            <h3>{van.name}</h3>
                            <div className="van-card-price">
                                <span className="price">${van.price}</span>
                                <span className="period">/day</span>
                            </div>
                        </div>
                        <span className={`van-type-badge ${van.type}`}>{van.type}</span>
                    </div>
                </Link>
            </div>
        ))
        return (
            <>
                <div className="vans-content-wrapper">
                    <div className="vans-sidebar">
                        <div className="vans-filters-container">
                            <div className="filters-header">
                                <svg className="filter-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 5.83333H17.5M5.83333 10H14.1667M8.33333 14.1667H11.6667" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <h2>Filters</h2>
                            </div>
                            <div className="filters-content">
                                <p className="filter-label">VAN TYPE</p>
                                <div className="filter-buttons">
                                    <button
                                        onClick={() => handleFilterChange("type", "simple")}
                                        className={`van-filter-btn simple ${typeFilter === "simple" ? "selected" : ""}`}
                                    >
                                        <span>Simple</span>
                                        <span className="filter-count">({simpleCoun})</span>
                                    </button>
                                    <button
                                        onClick={() => handleFilterChange("type", "luxury")}
                                        className={`van-filter-btn luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                                    >
                                        <span>Luxury</span>
                                        <span className="filter-count">({luxuryCount})</span>
                                    </button>
                                    <button
                                        onClick={() => handleFilterChange("type", "rugged")}
                                        className={`van-filter-btn rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                                    >
                                        <span>Rugged</span>
                                        <span className="filter-count">({ruggedCount})</span>
                                    </button>
                                    {typeFilter && (<button
                                        onClick={() => handleFilterChange("type", null)}
                                        className="van-filter-btn clear-filters"
                                    >
                                        Clear filters
                                    </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="quick-stats-container">
                            <h3>Quick Stats</h3>
                            <div className="stats-list">
                                <div className="stat-row">
                                    <span className="stat-label">Total Vans</span>
                                    <span className="stat-value">{vans.length}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-label">Showing</span>
                                    <span className="stat-value showing">{displayedVans.length}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-label">Price Range</span>
                                    <span className="stat-value">${minPrice}-${maxPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="vans-results">
                        <div className="van-grid">
                            {vanElements}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="van-list-container">
            <div className="vans-header">
                <h1>Explore our van options</h1>
                <p>Find the perfect van for your next adventure. All vans are fully equipped and ready to go.</p>
            </div>
            <React.Suspense fallback={<h2 className="vans-loading">Loading vans...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
            </React.Suspense>
        </div>
    )
}