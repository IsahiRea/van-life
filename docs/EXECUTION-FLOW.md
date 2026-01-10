# Code Execution Flow

This document explains how the Van-life application bootstraps, routes, and renders content.

## App Bootstrap Sequence

### 1. HTML Entry Point (`index.html`)
```html
<div id="root"></div>
<script src="/src/index.jsx" type="module"></script>
```
- Loads Google Fonts (Inter, Poppins)
- Vite serves the module entry point

### 2. JavaScript Entry (`src/index.jsx`)

**Initialization order:**
1. Import React and dependencies
2. Firebase initializes via `api.js` import
3. CSS loads via `main.css` import
4. Router configuration created
5. App component renders

```jsx
// Router setup
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    {/* All routes defined here */}
  </Route>
))

// App renders with auth context wrapping router
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

// Mount to DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

### 3. Auth Context Initialization (`AuthContext.jsx`)

```jsx
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext value={{ currentUser, loading }}>
            {!loading && children}
        </AuthContext>
    );
}
```

**Flow:**
1. AuthProvider mounts, `loading = true`
2. Firebase `onAuthStateChanged` listener attaches
3. Firebase checks stored auth token
4. Listener fires with user (or null)
5. `loading = false`, children render

## Route Matching and Loader Execution

### React Router Flow

```
URL Change
    ↓
Router matches route path
    ↓
Loader function executes (if defined)
    ├── Returns data directly
    ├── Returns Promise (resolved before render)
    └── Throws redirect (navigation changes)
    ↓
Component renders with loader data
```

### Loader Patterns

**Direct return (synchronous):**
```jsx
export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}
```

**Promise return (async data):**
```jsx
export function loader() {
    return { vans: getVans() }  // Promise returned directly
}
```

**Protected with redirect:**
```jsx
export async function loader({ request }) {
    await requireAuth(request)  // Throws redirect if not auth'd
    return { vans: getHostVans() }
}
```

## Component Rendering with Data

### Using Loader Data

```jsx
export default function Vans() {
    const dataPromise = useLoaderData()  // Gets { vans: Promise }

    return (
        <Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.vans}>
                {(vans) => (
                    // Render with resolved data
                )}
            </Await>
        </Suspense>
    )
}
```

### Direct Data Access

```jsx
export default function VanDetail() {
    const van = useLoaderData()  // Already resolved object

    return (
        <div>
            <h1>{van.name}</h1>
            {/* ... */}
        </div>
    )
}
```

## User Interaction Examples

### Example 1: Viewing Public Vans

```
User navigates to /vans
    ↓
Router matches: <Route path="vans" element={<Vans />} loader={vansLoader} />
    ↓
vansLoader() executes:
    return { vans: getVans() }
    ↓
getVans() queries Firestore:
    const snapshot = await getDocs(vansCollectionRef)
    return snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
    ↓
Vans component receives Promise via useLoaderData()
    ↓
<Suspense> shows "Loading vans..." while Promise resolves
    ↓
<Await> resolves Promise, passes data to render function
    ↓
Van cards render with filter sidebar
```

### Example 2: Login Flow

```
User submits login form
    ↓
<Form method="post"> triggers action
    ↓
loginAction({ request }) executes:
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    ↓
signInUser({ email, password }) calls Firebase Auth
    ↓
On success:
    return redirect(pathname)  // Navigate to /host or redirectTo
    ↓
On failure:
    return err.message  // Component displays error
    ↓
Firebase triggers onAuthStateChanged
    ↓
AuthContext updates currentUser
    ↓
Header re-renders (login icon → logout button)
```

### Example 3: Accessing Protected Route

```
User clicks link to /host/vans
    ↓
Router matches: <Route path="vans" loader={hostVansLoader} />
    ↓
hostVansLoader({ request }) executes:
    await requireAuth(request)  // Check authentication
    ↓
requireAuth() checks auth.currentUser:
    ↓
If NOT authenticated:
    throw redirect('/login?message=You must log in first.&redirectTo=/host/vans')
    ↓
    User sees login page with message
    ↓
If authenticated:
    return { vans: getHostVans() }  // Fetch host's vans
    ↓
    getHostVans() queries with hostId filter:
        query(vansCollectionRef, where("hostId", "==", user.uid))
    ↓
    Component renders host's vans
```

### Example 4: Van Detail with Back Navigation

```
User clicks van card on /vans?type=luxury
    ↓
Link passes state: <Link to={van.id} state={{ search: "?type=luxury", type: "luxury" }}>
    ↓
Router navigates to /vans/3
    ↓
vanDetailLoader({ params }) executes:
    return getVan(params.id)  // "3"
    ↓
VanDetail component receives van data
    ↓
Component reads location.state:
    const location = useLocation()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"
    ↓
Back link preserves filter:
    <Link to={`..${search}`}>Back to {type} vans</Link>
    ↓
Renders as: <Link to="../?type=luxury">Back to luxury vans</Link>
```

### Example 5: Nested Host Van Detail

```
User navigates to /host/vans/3/pricing
    ↓
Route hierarchy matches:
    /host → HostLayout
        /vans/:id → HostVanDetail (loader fetches van)
            /pricing → HostVanPricing
    ↓
HostVanDetail loader executes:
    await requireAuth(request)
    return getVan(params.id)
    ↓
HostVanDetail renders with van data:
    <Outlet context={{ currentVan }} />
    ↓
HostVanPricing receives context:
    const { currentVan } = useOutletContext()
    ↓
Renders pricing info from currentVan
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   React App                          │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │           AuthProvider (Context)              │   │   │
│  │  │  • currentUser                                │   │   │
│  │  │  • loading                                    │   │   │
│  │  │  • onAuthStateChanged listener                │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  │                        │                             │   │
│  │  ┌─────────────────────▼──────────────────────┐     │   │
│  │  │           RouterProvider                    │     │   │
│  │  │                                             │     │   │
│  │  │  URL → Route Match → Loader → Component    │     │   │
│  │  │                                             │     │   │
│  │  │  ┌─────────────────────────────────────┐   │     │   │
│  │  │  │              Loaders                 │   │     │   │
│  │  │  │  • vansLoader → getVans()           │   │     │   │
│  │  │  │  • dashboardLoader → getHostVans()  │   │     │   │
│  │  │  │  • loginAction → signInUser()       │   │     │   │
│  │  │  └─────────────────────────────────────┘   │     │   │
│  │  │                        │                    │     │   │
│  │  │  ┌─────────────────────▼───────────────┐   │     │   │
│  │  │  │           Components                 │   │     │   │
│  │  │  │  • useLoaderData() for data         │   │     │   │
│  │  │  │  • useAuth() for user state         │   │     │   │
│  │  │  │  • useNavigation() for loading UI   │   │     │   │
│  │  │  └─────────────────────────────────────┘   │     │   │
│  │  └────────────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Firebase                                │
│  ┌────────────────────┐    ┌────────────────────┐          │
│  │   Authentication   │    │     Firestore      │          │
│  │  • Sign in/out     │    │  • vans collection │          │
│  │  • Session mgmt    │    │  • users collection│          │
│  │  • Password reset  │    │  • Query filtering │          │
│  └────────────────────┘    └────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## Error Handling Flow

### Route Error Boundaries

```jsx
<Route
    path="vans"
    element={<Vans />}
    loader={vansLoader}
    errorElement={<Error />}  // Catches loader errors
/>
```

When loader throws:
```
Loader throws error
    ↓
React Router catches error
    ↓
Renders errorElement instead of element
    ↓
Error component displays via useRouteError()
```

### Action Error Handling

```jsx
export async function action({ request }) {
    try {
        await signInUser({ email, password })
        return redirect(pathname)
    } catch(err) {
        return err.message  // Return error to component
    }
}

// In component:
const errorMessage = useActionData()
{errorMessage && <div className="error">{errorMessage}</div>}
```

## Form Submission Flow

```jsx
<Form method="post">
    <input name="email" type="email" />
    <input name="password" type="password" />
    <button type="submit">
        {isSubmitting ? "Signing in..." : "Sign In"}
    </button>
</Form>
```

```
User submits form
    ↓
React Router intercepts submission
    ↓
Route's action function called with request
    ↓
Action extracts formData:
    const formData = await request.formData()
    ↓
Action performs operation (API call, validation)
    ↓
Action returns:
    • redirect() → navigation changes
    • data → accessible via useActionData()
    • null → form reset
    ↓
useNavigation().state tracks submission:
    "idle" → "submitting" → "idle"
```

## Key Hooks Reference

| Hook | Purpose | Returns |
|------|---------|---------|
| `useLoaderData()` | Get data from route loader | Loader return value |
| `useActionData()` | Get data from route action | Action return value |
| `useNavigation()` | Track navigation/submission state | `{ state, location, formData }` |
| `useParams()` | Get URL parameters | `{ id, slug, ... }` |
| `useLocation()` | Get current location | `{ pathname, search, state }` |
| `useOutletContext()` | Get context from parent Outlet | Context value |
| `useAuth()` | Get auth state from context | `{ currentUser, loading }` |
