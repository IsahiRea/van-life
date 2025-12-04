import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"
import { signOutUser } from "../api"
import avatarIcon from "../assets/images/avatar-icon.png"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    async function handleLogout() {
        try {
            await signOutUser();
            closeMenu();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
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

                {currentUser ? (
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                ) : (
                    <Link to="login" className="login-link" onClick={closeMenu}>
                        <img
                            src={avatarIcon}
                            className="login-icon"
                            alt="Login"
                        />
                    </Link>
                )}
            </nav>
        </header>
    )
}