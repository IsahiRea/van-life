# Architecture Overview

This document describes the high-level architecture of the Van-life application.

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | React | 19.2.1 |
| Routing | React Router | 7.10.0 |
| Backend | Firebase | 12.6.0 |
| Database | Firestore | (via Firebase) |
| Auth | Firebase Auth | (via Firebase) |
| Build Tool | Vite | 6.3.5 |
| Icons | react-icons | 5.5.0 |

## Project Structure

```
Van-life/
├── docs/                    # Documentation
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images and static files
│   ├── components/         # Reusable UI components
│   │   └── Error.jsx       # Error boundary component
│   ├── context/            # React context providers
│   │   └── AuthContext.jsx # Authentication state
│   ├── css/                # Stylesheets
│   │   ├── base/           # Reset and utilities
│   │   ├── components/     # Component styles
│   │   └── pages/          # Page-specific styles
│   │       └── host/       # Host section styles
│   ├── layouts/            # Layout components
│   │   ├── Layout.jsx      # Root layout
│   │   ├── Header.jsx      # Navigation header
│   │   ├── HostLayout.jsx  # Host section layout
│   │   └── Footer.jsx      # Site footer
│   ├── lib/                # Utilities and API
│   │   ├── api.js          # Firebase API functions
│   │   ├── utils.js        # Helper utilities
│   │   └── server.js       # MirageJS (legacy)
│   ├── pages/              # Page components
│   │   ├── Auth/           # Login, SignUp, ForgotPassword
│   │   ├── Host/           # Dashboard, Income, HostVans, etc.
│   │   ├── Vans/           # Vans listing, VanDetail
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── NotFound.jsx
│   └── index.jsx           # App entry and routing
├── index.html              # HTML entry point
├── CLAUDE.md               # AI assistant instructions
└── package.json            # Dependencies
```

## Component Hierarchy

```
App (index.jsx)
└── AuthProvider (context/AuthContext.jsx)
    └── RouterProvider
        └── Layout (layouts/Layout.jsx)
            ├── Header
            ├── Outlet (page content)
            │   ├── Home
            │   ├── About
            │   ├── Login / SignUp / ForgotPassword
            │   ├── Vans
            │   ├── VanDetail
            │   ├── NotFound
            │   └── HostLayout (layouts/HostLayout.jsx)
            │       ├── Host Nav
            │       └── Outlet (host content)
            │           ├── Dashboard
            │           ├── Income
            │           ├── Reviews
            │           ├── HostVans
            │           └── HostVanDetail
            │               └── Outlet (tab content)
            │                   ├── HostVanInfo
            │                   ├── HostVanPricing
            │                   └── HostVanPhotos
            └── Footer
```

## Route Structure

### Public Routes
| Path | Component | Loader | Description |
|------|-----------|--------|-------------|
| `/` | Home | - | Landing page |
| `/about` | About | - | About page |
| `/login` | Login | loginLoader | Login form |
| `/signup` | SignUp | - | Registration form |
| `/vans` | Vans | vansLoader | Van listings |
| `/vans/:id` | VanDetail | vanDetailLoader | Van details |

### Protected Routes (require authentication)
| Path | Component | Loader | Description |
|------|-----------|--------|-------------|
| `/host` | Dashboard | dashboardLoader | Host overview |
| `/host/income` | Income | requireAuth | Income tracking |
| `/host/reviews` | Reviews | requireAuth | Host reviews |
| `/host/vans` | HostVans | hostVansLoader | Host's van list |
| `/host/vans/:id` | HostVanDetail | hostVanDetailLoader | Van management |
| `/host/vans/:id/pricing` | HostVanPricing | requireAuth | Pricing tab |
| `/host/vans/:id/photos` | HostVanPhotos | requireAuth | Photos tab |

## Layout System

### Root Layout (`Layout.jsx`)
Wraps all routes with consistent header and footer:
```jsx
<div className="site-wrapper">
    <Header />
    <main>
        <Outlet />  {/* Page content renders here */}
    </main>
    <Footer />
</div>
```

### Host Layout (`HostLayout.jsx`)
Nested layout for host section with dashboard navigation:
```jsx
<>
    <nav className="host-nav-bar">
        <NavLink to="." end>Dashboard</NavLink>
        <NavLink to="income">Income</NavLink>
        <NavLink to="vans">Vans</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
    </nav>
    <Outlet />  {/* Host page content */}
</>
```

## CSS Architecture

### File Organization
```
src/css/
├── main.css              # Import aggregator
├── base/
│   ├── reset.css         # CSS reset
│   └── utilities.css     # Design system variables
├── components/
│   ├── header.css        # Header styles
│   ├── host-nav.css      # Host navigation
│   └── footer.css        # Footer styles
└── pages/
    ├── home.css          # Home page
    ├── about.css         # About page
    ├── vans.css          # Van listings
    ├── van-detail.css    # Van detail page
    ├── auth.css          # Login/SignUp
    └── host/             # Host section
        ├── dashboard.css
        ├── host-vans.css
        └── host-van-detail.css
```

### Design System (utilities.css)
CSS custom properties for consistent styling:

**Colors:**
- `--color-primary`: Brand orange (#FF8C38)
- `--color-text`: Text colors
- `--color-background`: Background colors
- Van type colors: `--color-simple`, `--color-luxury`, `--color-rugged`

**Spacing:**
- Scale: `--space-xs` through `--space-3xl`

**Typography:**
- Font families: `--font-primary`, `--font-secondary`
- Sizes: `--font-size-sm` through `--font-size-4xl`
- Weights: `--font-weight-regular`, `--font-weight-bold`

**Layout:**
- Border radius: `--radius-sm`, `--radius-md`, `--radius-lg`
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

### Responsive Breakpoints
Mobile-first approach:
- Mobile: Base styles (320px+)
- Tablet: `@media (min-width: 768px)`
- Desktop: `@media (min-width: 1024px)`
- Large: `@media (min-width: 1440px)`

## Data Flow Overview

```
User Action
    ↓
React Router matches route
    ↓
Loader function executes
    ├── Public: API call directly
    └── Protected: requireAuth() → API call
    ↓
Component receives data via useLoaderData()
    ↓
Component renders UI
    ↓
User sees content
```

## Key Dependencies

- **react** / **react-dom**: UI library
- **react-router**: Client-side routing with loaders
- **firebase**: Backend services (Firestore, Auth)
- **react-icons**: Icon components
- **miragejs**: Mock API server (legacy, disabled)
