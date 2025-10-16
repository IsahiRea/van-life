import React from "react"
import { Link, NavLink } from "react-router-dom"
import avatarIcon from "../assets/images/avatar-icon.png"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }

    function toggleMenu() {
        setIsMenuOpen(prev => !prev)
    }

    function closeMenu() {
        setIsMenuOpen(false)
    }

    return (
        <header>
            <Link className="site-logo" to="/" onClick={closeMenu}>#VanLife</Link>

            <button
                className="menu-toggle"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
            </button>

            <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                <NavLink
                    to="host"
                    style={({isActive}) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                >
                    Host
                </NavLink>
                <NavLink
                    to="about"
                    style={({isActive}) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                >
                    About
                </NavLink>
                <NavLink
                    to="vans"
                    style={({isActive}) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                >
                    Vans
                </NavLink>

                {localStorage.getItem("loggedin") ? (
                    <button onClick={() => {fakeLogOut(); closeMenu();}}>Logout</button>
                ) : (
                    <Link to="login" className="login-link" onClick={closeMenu}>
                        <img
                            src={avatarIcon}
                            className="login-icon"
                        />
                    </Link>
                )}
            </nav>
        </header>
    )
}