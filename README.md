# Vanlife 🚐

A modern React-based van rental marketplace application showcasing advanced React Router v6 patterns, Firebase integration, and mobile-first responsive design. Browse available vans, view detailed listings, and manage rentals through an intuitive interface with full authentication.

## Live Demo
🌐 [View Live Site](https://quiet-rabanadas-3dba69.netlify.app/)

## Screenshots

### Home Page
![Home Page](screenshots/home.png)

### About Page
![About Page](screenshots/about.png)

### Van Listings
![Van Listings](screenshots/vans.png)

### Login Page
![Login Page](screenshots/login.png)

### Host Dashboard
![Host Dashboard](screenshots/host-dashboard.png)

### Host Income
![Host Income](screenshots/host-income.png)

### Host Vans Management
![Host Vans](screenshots/host-vans.png)

### Host Reviews
![Host Reviews](screenshots/host-reviews.png)

## Features

### User Features
- **Van Listings**: Browse a curated collection of available rental vans with type filtering (simple, luxury, rugged)
- **Detailed Views**: View comprehensive information about each van including photos, pricing, and amenities
- **Smart Navigation**: Context-aware back navigation that remembers your filter selections
- **User Authentication**: Secure login and registration system powered by Firebase Authentication

### Host Features (Protected Routes)
- **Host Dashboard**: Comprehensive overview of your van rental business
- **Income Tracking**: Monitor revenue and financial metrics
- **Reviews Management**: View and respond to customer reviews
- **Van Management**: Complete CRUD operations for van listings
- **Detailed Van Editing**: Manage individual van info, pricing, and photo galleries

### Technical Features
- **React Router v6**: Advanced routing with loaders, nested routes, and protected routes
- **Firebase Firestore**: Real-time database for van listings
- **Mobile-First Design**: Responsive layouts optimized for all screen sizes
- **CSS Variables**: Comprehensive design system with 100+ custom properties
- **Error Handling**: Dedicated error pages and boundary components
- **State Preservation**: Navigation state management for seamless UX

## Tech Stack

### Frontend
- **Framework**: React.js 19.2.1
- **Routing**: React Router v7.10.0 (with createBrowserRouter, loaders, and nested routes)
- **Styling**: Vanilla CSS with modular architecture
- **Icons**: React Icons 5.5.0

### Backend & Data
- **Database**: Firebase 12.6.0 (Firestore for van data storage)
- **Authentication**: Firebase Authentication (email/password provider)
- **Mock Server**: MirageJS 0.1.46 (legacy endpoints, being phased out)

### Development Tools
- **Build Tool**: Vite
- **Package Manager**: npm
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/IsahiRea/van-life.git
cd van-life
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Demo Account

You can either:
1. **Create a new account** using the registration form
2. **Use existing demo credentials**:
   - **Email**: b@b.com
   - **Password**: p123

## Project Structure

```
Van-life/
├── docs/                  # Technical documentation
│   ├── ARCHITECTURE.md    # System architecture
│   ├── EXECUTION-FLOW.md  # Code execution flow
│   ├── API.md             # API reference
│   └── AUTHENTICATION.md  # Auth system docs
├── src/
│   ├── assets/            # Static assets and images
│   ├── components/        # Reusable UI components
│   ├── context/           # React context (AuthContext)
│   ├── css/               # Modular CSS architecture
│   │   ├── base/          # Reset and utility styles
│   │   ├── components/    # Component-specific styles
│   │   └── pages/         # Page-specific styles
│   │       └── host/      # Host page styles
│   ├── layouts/           # Layout components (Header, Footer, etc.)
│   ├── lib/               # API and utilities
│   │   ├── api.js         # Firebase API functions
│   │   ├── utils.js       # Utility functions (requireAuth, etc.)
│   │   └── server.js      # MirageJS mock server (legacy)
│   ├── pages/             # Route components
│   │   ├── Auth/          # Login, SignUp, ForgotPassword
│   │   ├── Host/          # Dashboard and van management
│   │   └── Vans/          # Public van listing and detail
│   └── index.jsx          # Main application entry & route definitions
├── CLAUDE.md              # AI assistant instructions
└── index.html             # Root HTML file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Architecture Highlights

### React Router v6 Patterns
- **Loader-based data fetching** - No useEffect for data loading, cleaner components
- **Nested routes** - Complex layouts with multiple outlet levels
- **Protected routes** - Authentication guards using loader functions
- **Error boundaries** - Route-level error handling with dedicated Error component
- **State preservation** - Smart back navigation using location.state

### CSS Architecture
- **Mobile-first approach** - Base styles for mobile, enhanced for larger screens
- **CSS custom properties** - 100+ design tokens in utilities.css for consistent theming
- **Modular structure** - Organized into base/, components/, and pages/
- **Responsive breakpoints**:
  - Mobile: Base styles (no media query)
  - Tablet: 768px
  - Desktop: 1024px
  - Large Desktop: 1440px

### Firebase Integration
- **Firestore database** - Van listings stored and retrieved from Firestore
- **Firebase Authentication** - Secure user authentication with email/password
- **API abstraction** - Clean separation between data layer (api.js) and components
- **Real-time auth state** - Firebase onAuthStateChanged for session management

### Authentication System
- **Firebase Auth** - Production-ready authentication service
- **Email/password provider** - User registration and login
- **Session persistence** - Firebase handles token management and session state
- **Route protection** - requireAuth() utility function guards protected routes
- **Auth context** - React context for accessing current user across components

## Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/vans` - Browse all available vans
- `/vans/:id` - Individual van details
- `/login` - User authentication

### Protected Routes (Host Dashboard)
- `/host` - Host dashboard overview
- `/host/income` - Income tracking
- `/host/reviews` - Customer reviews
- `/host/vans` - Manage van listings
- `/host/vans/:id` - Van management (Info, Pricing, Photos)

## Documentation

Detailed technical documentation is available in the `docs/` folder:

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Project structure, component hierarchy, route structure, CSS architecture |
| [EXECUTION-FLOW.md](docs/EXECUTION-FLOW.md) | App bootstrap, routing flow, data fetching, user interaction examples |
| [API.md](docs/API.md) | Firebase setup, Firestore collections, all API function signatures |
| [AUTHENTICATION.md](docs/AUTHENTICATION.md) | Auth context, login/logout flows, route protection, session persistence |

## Learning Outcomes

This project demonstrates proficiency in:
- Advanced React Router v6 concepts (loaders, nested routing, protected routes)
- Firebase Firestore integration and API design
- Mobile-first responsive CSS without frameworks
- Component architecture and code organization
- State management with React Router's location.state
- Authentication flow implementation
- Modern build tools (Vite) and deployment (Netlify)

## Contributing

This is a learning project, but suggestions and improvements are welcome. Feel free to open an issue or submit a pull request.

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Built as part of a React Router learning curriculum
- Van images and content for demonstration purposes only

---

Built with ❤️ by [IsahiRea](https://github.com/IsahiRea)