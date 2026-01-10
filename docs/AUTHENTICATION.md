# Authentication System

This document explains the complete authentication system including Firebase Auth setup, state management, and route protection.

## Overview

The Van-life app uses Firebase Authentication with email/password provider. Auth state is managed globally via React Context, and protected routes use loader-based authentication checks.

## Firebase Auth Setup

**File:** `src/lib/api.js`

```javascript
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile
} from "firebase/auth";

export const auth = getAuth(app);
```

The `auth` instance is exported and used throughout the application.

## Auth Context

**File:** `src/context/AuthContext.jsx`

The AuthContext provides global authentication state to all components.

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/api';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                localStorage.setItem("loggedin", true);
            } else {
                localStorage.removeItem("loggedin");
            }
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext value={{ currentUser, loading }}>
            {!loading && children}
        </AuthContext>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
```

### Key Features

1. **State Management**
   - `currentUser`: Firebase user object or null
   - `loading`: Boolean indicating if auth state is being determined

2. **onAuthStateChanged Listener**
   - Fires on app load to check existing session
   - Fires whenever auth state changes (login/logout)
   - Automatically restores sessions from Firebase's stored token

3. **Loading Guard**
   - Children only render after `loading` is false
   - Prevents flash of unauthenticated content

4. **localStorage Sync**
   - Sets `loggedin` flag for quick checks
   - Backward compatibility with older code

### Usage

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
    const { currentUser, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return currentUser
        ? <div>Welcome, {currentUser.email}!</div>
        : <div>Please log in</div>;
}
```

## Authentication Flows

### Sign Up Flow

**File:** `src/pages/Auth/SignUp.jsx`

```
User fills form (name, email, password, confirmPassword)
    ↓
Client-side validation:
    • Password min 6 characters
    • Passwords match
    ↓
signUpUser({ email, password, name }) called
    ↓
Firebase createUserWithEmailAndPassword()
    ↓
Firestore user profile created with:
    • uid, email, name
    • createdAt timestamp
    • role: "host"
    ↓
onAuthStateChanged fires → currentUser updates
    ↓
Navigate to /host
```

**Implementation:**
```jsx
function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    // Validation
    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters")
        return
    }
    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
    }

    setStatus("submitting")

    signUpUser(formData)
        .then(() => {
            setStatus("idle")
            navigate("/host", { replace: true })
        })
        .catch(err => {
            setError(err.message)
            setStatus("idle")
        })
}
```

### Login Flow

**File:** `src/pages/Auth/Login.jsx`

```
User submits email/password form
    ↓
loginAction({ request }) executes
    ↓
Extract form data and redirectTo param
    ↓
signInUser({ email, password })
    ↓
Firebase signInWithEmailAndPassword()
    ↓
On success: redirect(redirectTo || "/host")
On failure: return error message
    ↓
onAuthStateChanged fires → currentUser updates
```

**Loader (extracts URL message):**
```javascript
export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}
```

**Action (handles form submission):**
```javascript
export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/host"

    try {
        await signInUser({ email, password })
        return redirect(pathname)
    } catch(err) {
        return err.message
    }
}
```

**Component usage:**
```jsx
export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"

    return (
        <Form method="post">
            {message && <p className="info">{message}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}

            <input name="email" type="email" required />
            <input name="password" type="password" required />

            <button disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
        </Form>
    )
}
```

### Logout Flow

**File:** `src/layouts/Header.jsx`

```
User clicks Logout button
    ↓
signOutUser() called
    ↓
Firebase signOut() clears session
    ↓
onAuthStateChanged fires with null
    ↓
AuthContext updates currentUser to null
    ↓
Navigate to /login
```

**Implementation:**
```jsx
export default function Header() {
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await signOutUser();
            closeMenu();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <header>
            <nav>
                {currentUser ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="login">Login</Link>
                )}
            </nav>
        </header>
    )
}
```

### Password Reset Flow

**File:** `src/pages/Auth/ForgotPassword.jsx`

```
User enters email
    ↓
resetPassword(email) called
    ↓
Firebase sendPasswordResetEmail()
    ↓
Email sent with reset link
    ↓
User clicks link → Firebase handles reset
    ↓
User redirected to /login
```

## Route Protection

### requireAuth Utility

**File:** `src/lib/utils.js`

```javascript
import { redirect } from "react-router"
import { auth } from "./api"

export async function requireAuth(request) {
    const user = auth.currentUser

    if (!user) {
        const pathname = new URL(request.url).pathname
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }

    return user
}
```

### How It Works

1. Called in route **loaders** (not components)
2. Checks `auth.currentUser` synchronously
3. If no user: throws redirect with message and return path
4. If user exists: returns user object, loader continues

### Protected Route Examples

**Simple protection (auth check only):**
```jsx
<Route
    path="income"
    element={<Income />}
    loader={async ({ request }) => await requireAuth(request)}
/>
```

**Protection with data fetching:**
```jsx
// In Dashboard.jsx
export async function loader({ request }) {
    await requireAuth(request)  // Protects route
    return { vans: getHostVans() }  // Fetches data
}

// In index.jsx
<Route
    index
    element={<Dashboard />}
    loader={dashboardLoader}
/>
```

### Protection Flow Diagram

```
User navigates to /host/vans
    ↓
Router matches route
    ↓
hostVansLoader({ request }) executes
    ↓
await requireAuth(request)
    ↓
auth.currentUser checked
    ↓
┌─────────────────────────────────────────────┐
│ If NOT authenticated:                        │
│   throw redirect('/login?message=...')      │
│   ↓                                          │
│   User redirected to /login                  │
│   Message displayed: "You must log in first" │
│   redirectTo=/host/vans preserved            │
└─────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────┐
│ If authenticated:                            │
│   return user                               │
│   ↓                                          │
│   Loader continues: getHostVans()           │
│   ↓                                          │
│   Component renders with data               │
└─────────────────────────────────────────────┘
```

## Session Persistence

### How Sessions Persist

Firebase Auth automatically manages session persistence:

1. **On Login:** Firebase stores auth token in browser storage
2. **On Page Refresh:** Firebase checks stored token validity
3. **Token Valid:** Session automatically restored
4. **Token Expired:** User must re-authenticate

### Persistence Flow

```
Page Load / Refresh
    ↓
AuthProvider mounts
    ↓
loading = true (prevents child render)
    ↓
onAuthStateChanged fires
    ↓
Firebase checks stored token
    ↓
┌─────────────────────────────────┐
│ If valid token:                  │
│   currentUser = restored user    │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ If no/expired token:             │
│   currentUser = null             │
└─────────────────────────────────┘
    ↓
loading = false
    ↓
Children render with auth state
```

### Why This Works

- Firebase stores tokens in IndexedDB by default
- Tokens auto-refresh before expiration
- `onAuthStateChanged` is the source of truth
- No manual token management needed

## Protected Routes Summary

| Route | Protection | Data Fetch |
|-------|------------|------------|
| `/host` | requireAuth | getHostVans() |
| `/host/income` | requireAuth | None |
| `/host/reviews` | requireAuth | None |
| `/host/vans` | requireAuth | getHostVans() |
| `/host/vans/:id` | requireAuth | getVan(id) |
| `/host/vans/:id/pricing` | requireAuth | None (uses parent) |
| `/host/vans/:id/photos` | requireAuth | None (uses parent) |

## Security Considerations

### Client-Side Protection

- Route protection happens in loaders
- User never sees protected content without auth
- Redirects preserve intended destination

### Server-Side Protection

- Firestore rules should validate `hostId` matches `auth.uid`
- API calls with auth return filtered data
- `getHostVans()` queries by current user's UID

### Best Practices Implemented

1. **Auth state as source of truth:** Always check `auth.currentUser`
2. **Loading states:** Prevent rendering until auth determined
3. **Smart redirects:** Return users to intended destination after login
4. **Error handling:** User-friendly error messages
5. **Logout cleanup:** Navigate away and clear state

## Demo Credentials

For testing purposes:
- **Email:** `b@b.com`
- **Password:** `p123`

Or create a new account via `/signup`.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         App                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    AuthProvider                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  currentUser: FirebaseUser | null               │  │  │
│  │  │  loading: boolean                                │  │  │
│  │  │                                                  │  │  │
│  │  │  onAuthStateChanged() ←──── Firebase Auth       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                          │                             │  │
│  │                          ▼                             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                RouterProvider                    │  │  │
│  │  │                                                  │  │  │
│  │  │  Protected Routes:                               │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │  Loader calls requireAuth(request)        │  │  │  │
│  │  │  │      ↓                                     │  │  │  │
│  │  │  │  Checks auth.currentUser                  │  │  │  │
│  │  │  │      ↓                                     │  │  │  │
│  │  │  │  No user? → redirect('/login')            │  │  │  │
│  │  │  │  Has user? → continue to data fetch       │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  │                                                  │  │  │
│  │  │  Public Routes: No auth check in loader         │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  Components use:                                             │
│  • useAuth() for currentUser access                         │
│  • useLoaderData() for route data                           │
│  • useActionData() for form errors                          │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Firebase Services                        │
│  ┌────────────────────┐    ┌────────────────────┐          │
│  │   Authentication   │    │     Firestore      │          │
│  │  • Sign in/up/out  │    │  • users profiles  │          │
│  │  • Password reset  │    │  • vans data       │          │
│  │  • Session mgmt    │    │  • hostId queries  │          │
│  └────────────────────┘    └────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```
