# API Reference

This document covers the Firebase configuration, Firestore data structure, and all API functions.

## Firebase Configuration

**File:** `src/lib/api.js`

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAalVUUmQ5jPFGKBBB8Bn6HfJFVnGqwzc4",
  authDomain: "vanlife-49815.firebaseapp.com",
  projectId: "vanlife-49815",
  storageBucket: "vanlife-49815.firebasestorage.app",
  messagingSenderId: "23593798740",
  appId: "1:23593798740:web:46ef9d2292d3fb7937b1c1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
```

**Exports:**
- `auth` - Firebase Auth instance for authentication operations

## Firestore Collections

### `vans` Collection

Stores all van listings.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Document ID |
| `name` | string | Van name (e.g., "Modest Explorer") |
| `price` | number | Daily rental price |
| `description` | string | Detailed van description |
| `imageUrl` | string | CDN URL to van image |
| `type` | string | One of: "simple", "luxury", "rugged" |
| `hostId` | string | Firebase UID of van owner |

**Example document:**
```json
{
  "id": "1",
  "name": "Modest Explorer",
  "price": 60,
  "description": "The Modest Explorer is a van designed to get you out...",
  "imageUrl": "https://assets.scrimba.com/.../modest-explorer.png",
  "type": "simple",
  "hostId": "abc123"
}
```

### `users` Collection

Stores user profiles.

| Field | Type | Description |
|-------|------|-------------|
| `uid` | string | Firebase Auth UID (also document ID) |
| `email` | string | User email |
| `name` | string | Full name |
| `createdAt` | string | ISO timestamp |
| `role` | string | User role (default: "host") |
| `displayName` | string? | Optional display name |
| `photoURL` | string? | Optional profile photo URL |
| `bio` | string? | Optional bio |
| `updatedAt` | string? | Last update timestamp |

## Data Fetching Functions

### `getVans()`

Fetches all vans from Firestore.

```javascript
export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}
```

| Property | Value |
|----------|-------|
| Parameters | None |
| Returns | `Promise<Van[]>` |
| Auth Required | No |

### `getVan(id)`

Fetches a single van by ID.

```javascript
export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}
```

| Property | Value |
|----------|-------|
| Parameters | `id: string` - Van document ID |
| Returns | `Promise<Van>` |
| Auth Required | No |

### `getHostVans()`

Fetches vans owned by the currently authenticated user.

```javascript
export async function getHostVans() {
    const user = auth.currentUser

    if (!user) {
        throw new Error("You must be logged in to view your vans")
    }

    const q = query(vansCollectionRef, where("hostId", "==", user.uid))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}
```

| Property | Value |
|----------|-------|
| Parameters | None |
| Returns | `Promise<Van[]>` |
| Auth Required | Yes |
| Throws | Error if not authenticated |

## Authentication Functions

### `signUpUser({ email, password, name })`

Creates a new user account and profile.

```javascript
export async function signUpUser({ email, password, name }) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Create Firestore profile
        const userDocRef = doc(db, "users", user.uid)
        await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            name: name,
            createdAt: new Date().toISOString(),
            role: "host"
        })

        return { user: userCredential.user }
    } catch (error) {
        throw new Error(error.message)
    }
}
```

| Property | Value |
|----------|-------|
| Parameters | `{ email: string, password: string, name: string }` |
| Returns | `Promise<{ user: FirebaseUser }>` |
| Side Effects | Creates Auth user + Firestore profile |
| Throws | Firebase error messages |

### `signInUser({ email, password })`

Authenticates a user with email and password.

```javascript
export async function signInUser({ email, password }) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return { user: userCredential.user }
    } catch (error) {
        throw new Error(error.message)
    }
}
```

| Property | Value |
|----------|-------|
| Parameters | `{ email: string, password: string }` |
| Returns | `Promise<{ user: FirebaseUser }>` |
| Throws | Firebase error messages |

### `signOutUser()`

Signs out the current user.

```javascript
export async function signOutUser() {
    try {
        await signOut(auth)
    } catch (error) {
        throw new Error(error.message)
    }
}
```

| Property | Value |
|----------|-------|
| Parameters | None |
| Returns | `Promise<void>` |
| Side Effects | Clears auth session |

### `resetPassword(email)`

Sends a password reset email.

```javascript
export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email, {
            url: window.location.origin + '/login',
            handleCodeInApp: false
        })
        return { success: true }
    } catch (error) {
        throw new Error(error.message)
    }
}
```

| Property | Value |
|----------|-------|
| Parameters | `email: string` |
| Returns | `Promise<{ success: boolean }>` |
| Side Effects | Sends email via Firebase |

### `sendVerificationEmail()`

Sends email verification to the current user.

```javascript
export async function sendVerificationEmail() {
    const user = auth.currentUser

    if (!user) {
        throw new Error("No user is currently signed in")
    }

    try {
        await firebaseSendEmailVerification(user, {
            url: window.location.origin + '/host',
            handleCodeInApp: false
        })
        return { success: true }
    } catch (error) {
        throw new Error(error.message)
    }
}
```

| Property | Value |
|----------|-------|
| Parameters | None |
| Returns | `Promise<{ success: boolean }>` |
| Auth Required | Yes |
| Side Effects | Sends verification email |

## User Profile Functions

### `getUserProfile(userId)`

Retrieves a user profile from Firestore.

```javascript
export async function getUserProfile(userId) {
    const userDocRef = doc(db, "users", userId)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        throw new Error("User profile not found")
    }

    return {
        id: userSnapshot.id,
        ...userSnapshot.data()
    }
}
```

| Property | Value |
|----------|-------|
| Parameters | `userId: string` - Firebase UID |
| Returns | `Promise<UserProfile>` |
| Throws | Error if profile not found |

### `updateUserProfile({ displayName, photoURL, bio })`

Updates user's Auth profile and Firestore document.

```javascript
export async function updateUserProfile({ displayName, photoURL, bio }) {
    const user = auth.currentUser

    if (!user) {
        throw new Error("No user is currently signed in")
    }

    try {
        // Update Firebase Auth profile
        if (displayName || photoURL) {
            await updateProfile(user, {
                displayName: displayName || user.displayName,
                photoURL: photoURL || user.photoURL
            })
        }

        // Update Firestore profile
        const userDocRef = doc(db, "users", user.uid)
        const updateData = { updatedAt: new Date().toISOString() }

        if (displayName) updateData.displayName = displayName
        if (photoURL) updateData.photoURL = photoURL
        if (bio) updateData.bio = bio

        await setDoc(userDocRef, updateData, { merge: true })

        return { success: true }
    } catch (error) {
        throw new Error(error.message)
    }
}
```

| Property | Value |
|----------|-------|
| Parameters | `{ displayName?: string, photoURL?: string, bio?: string }` |
| Returns | `Promise<{ success: boolean }>` |
| Auth Required | Yes |
| Side Effects | Updates Auth profile + Firestore doc |

## Route Loaders

Loaders are functions that fetch data before a route renders.

### Public Route Loaders

**vansLoader** (`pages/Vans/Vans.jsx`)
```javascript
export function loader() {
    return { vans: getVans() }
}
```
- Route: `/vans`
- Returns: `{ vans: Promise<Van[]> }`

**vanDetailLoader** (`pages/Vans/VanDetail.jsx`)
```javascript
export function loader({ params }) {
    return getVan(params.id)
}
```
- Route: `/vans/:id`
- Returns: `Promise<Van>`

**loginLoader** (`pages/Auth/Login.jsx`)
```javascript
export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}
```
- Route: `/login`
- Returns: `string | null` (query param message)

### Protected Route Loaders

**dashboardLoader** (`pages/Host/Dashboard.jsx`)
```javascript
export async function loader({ request }) {
    await requireAuth(request)
    return { vans: getHostVans() }
}
```
- Route: `/host`
- Auth: Required
- Returns: `{ vans: Promise<Van[]> }`

**hostVansLoader** (`pages/Host/HostVans.jsx`)
```javascript
export async function loader({ request }) {
    await requireAuth(request)
    return { vans: getHostVans() }
}
```
- Route: `/host/vans`
- Auth: Required
- Returns: `{ vans: Promise<Van[]> }`

**hostVanDetailLoader** (`pages/Host/HostVanDetail.jsx`)
```javascript
export async function loader({ params, request }) {
    await requireAuth(request)
    return getVan(params.id)
}
```
- Route: `/host/vans/:id`
- Auth: Required
- Returns: `Promise<Van>`

### Simple Auth Loaders

For routes that only need authentication, not data:
```javascript
loader={async ({ request }) => await requireAuth(request)}
```

Used on: `/host/income`, `/host/reviews`, `/host/vans/:id/pricing`, `/host/vans/:id/photos`

## Route Actions

### loginAction (`pages/Auth/Login.jsx`)

```javascript
export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        await signInUser({ email, password })
        return redirect(pathname)
    } catch(err) {
        return err.message
    }
}
```

| Property | Value |
|----------|-------|
| Route | POST `/login` |
| Form Fields | `email`, `password` |
| Success | Redirects to `redirectTo` param or `/host` |
| Failure | Returns error message string |

## Helper Utilities

### `requireAuth(request)` (`lib/utils.js`)

Protects routes by checking authentication.

```javascript
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

| Property | Value |
|----------|-------|
| Parameters | `request: Request` |
| Returns | `FirebaseUser` if authenticated |
| Throws | Redirect to `/login` if not authenticated |

## Error Handling

### API Error Pattern

All API functions wrap Firebase errors:
```javascript
try {
    // Firebase operation
} catch (error) {
    throw new Error(error.message)
}
```

### Common Firebase Auth Errors

| Error Code | Description |
|------------|-------------|
| `auth/email-already-in-use` | Email already registered |
| `auth/invalid-email` | Invalid email format |
| `auth/weak-password` | Password too weak (min 6 chars) |
| `auth/user-not-found` | No user with this email |
| `auth/wrong-password` | Incorrect password |

### Component Error Display

```jsx
// Action errors
const errorMessage = useActionData()
{errorMessage && <div className="error">{errorMessage}</div>}

// State-based errors
const [error, setError] = useState(null)
{error && <div className="error">{error}</div>}
```

## API Summary Table

| Function | Purpose | Auth | Returns |
|----------|---------|------|---------|
| `getVans()` | Get all vans | No | `Van[]` |
| `getVan(id)` | Get single van | No | `Van` |
| `getHostVans()` | Get user's vans | Yes | `Van[]` |
| `signUpUser(data)` | Create account | No | `{ user }` |
| `signInUser(data)` | Login | No | `{ user }` |
| `signOutUser()` | Logout | Yes | `void` |
| `getUserProfile(uid)` | Get profile | No* | `UserProfile` |
| `updateUserProfile(data)` | Update profile | Yes | `{ success }` |
| `resetPassword(email)` | Send reset email | No | `{ success }` |
| `sendVerificationEmail()` | Send verification | Yes | `{ success }` |

*`getUserProfile` doesn't check auth internally, but callers typically require it
