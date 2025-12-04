import { NavLink, Outlet } from "react-router"

export default function HostLayout() {
    return (
        <>
            <nav className="host-nav-bar">
                <NavLink
                    to="."
                    end
                    className={({ isActive }) => isActive ? "host-nav-link active" : "host-nav-link"}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 6L8 1L14 6V14C14 14.5304 13.7893 15.0391 13.4142 15.4142C13.0391 15.7893 12.5304 16 12 16H4C3.46957 16 2.96086 15.7893 2.58579 15.4142C2.21071 15.0391 2 14.5304 2 14V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 16V8H10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Dashboard
                </NavLink>

                <NavLink
                    to="income"
                    className={({ isActive }) => isActive ? "host-nav-link active" : "host-nav-link"}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Income
                </NavLink>

                <NavLink
                    to="vans"
                    className={({ isActive }) => isActive ? "host-nav-link active" : "host-nav-link"}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 1H1V11H12V1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 4H15V11H12V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="3.5" cy="13.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="10.5" cy="13.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Vans
                </NavLink>

                <NavLink
                    to="reviews"
                    className={({ isActive }) => isActive ? "host-nav-link active" : "host-nav-link"}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1l2.09 4.26L15 6.09l-3.5 3.41.83 4.88L8 12.36l-4.33 2.02.83-4.88L1 6.09l4.91-.83L8 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Reviews
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
}
