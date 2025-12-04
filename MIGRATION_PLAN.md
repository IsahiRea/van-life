# React 19 & React Router 7 Migration Plan

## Executive Summary

This document outlines the migration path for upgrading the Van-life project from:
- **React 18.2.0 → React 19.2.1**
- **React Router v6.4.3 → React Router v7.10.0**

Both upgrades are **low-risk** for this codebase due to modern patterns already in use. Estimated total effort: **4-8 hours**.

---

## Table of Contents

1. [React 19 Migration](#react-19-migration)
2. [React Router 7 Migration](#react-router-7-migration)
3. [Recommended Migration Strategy](#recommended-migration-strategy)
4. [Testing Strategy](#testing-strategy)
5. [Rollback Procedures](#rollback-procedures)

---

## React 19 Migration

### Breaking Changes Summary

#### 1. Removed APIs (✅ No Action Needed)

Your codebase doesn't use any of these deprecated APIs:
- ❌ PropTypes (not used)
- ❌ defaultProps in function components (not used)
- ❌ Legacy Context API (using modern Context)
- ❌ String refs (not used)
- ❌ React.createFactory (not used)
- ❌ ReactDOM.render (verify in src/index.jsx)
- ❌ ReactDOM.findDOMNode (not used)

#### 2. Critical Check: Rendering Method

**ACTION REQUIRED:** Verify `src/index.jsx` uses `createRoot`:

```javascript
// ❌ OLD (React 18 - will break in React 19)
import { render } from 'react-dom';
render(<App />, document.getElementById('root'));

// ✅ NEW (React 19 - required)
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);
```

**Status:** ✅ VERIFIED - src/index.jsx correctly uses `ReactDOM.createRoot()`

#### 3. JSX Transform (✅ Already Configured)

React 19 requires the automatic JSX transform. Your Vite config already has this via `@vitejs/plugin-react`.

**Optional Cleanup:** Remove `import React from "react"` from all 22 `.jsx` files (no longer needed).

### New Features Worth Adopting

#### 1. useActionState Hook (Recommended for Login/Signup)

Simplifies form handling in `src/pages/Login.jsx`:

```javascript
import { useActionState } from 'react';

function LoginForm() {
  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        await loginUser({
          email: formData.get('email'),
          password: formData.get('password')
        });
        return { success: true };
      } catch (err) {
        return { error: err.message };
      }
    },
    { success: false, error: null }
  );

  return (
    <form action={submitAction}>
      {/* form fields */}
      <button disabled={isPending}>
        {isPending ? "Logging in..." : "Log in"}
      </button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}
```

#### 2. Simplified Context (Optional)

Update `src/context/AuthContext.jsx`:

```javascript
// OLD
<AuthContext.Provider value={value}>
  {children}
</AuthContext.Provider>

// NEW (React 19)
<AuthContext value={value}>
  {children}
</AuthContext>
```

#### 3. Enhanced Error Handling (Optional)

Add error callbacks in `src/index.jsx`:

```javascript
createRoot(document.getElementById('root'), {
  onCaughtError: (error, errorInfo) => {
    console.error('Caught by Error Boundary:', error, errorInfo);
  },
  onUncaughtError: (error, errorInfo) => {
    console.error('Uncaught error:', error, errorInfo);
  }
}).render(<App />);
```

### React 19 Migration Steps

1. **Upgrade to React 18.3.1 first** (recommended):
   ```bash
   npm install react@18.3.1 react-dom@18.3.1
   npm run dev
   # Check console for deprecation warnings
   ```

2. **Fix any warnings** from step 1

3. **Upgrade to React 19**:
   ```bash
   npm install --save-exact react@19.2.1 react-dom@19.2.1
   ```

4. **Verify src/index.jsx** uses `createRoot()`

5. **Test thoroughly** (see Testing Strategy section)

6. **Optional: Run codemods**:
   ```bash
   # Remove unnecessary React imports
   npx codemod@latest react/19/migration-recipe
   ```

### Third-Party Library Compatibility

**Need to verify:**
- ✅ react-router-dom@6.4.3 - Compatible with React 19
- ✅ firebase@12.6.0 - Likely compatible (check after upgrade)
- ⚠️ miragejs@0.1.48 - May have issues (being phased out anyway)
- ✅ react-icons@5.5.0 - Likely compatible
- ✅ vite@7.2.6 - Compatible

---

## React Router 7 Migration

### Critical Changes

#### 1. Package Consolidation ⚠️ **BREAKING**

**Current:**
```json
"react-router-dom": "6.4.3"
```

**New:**
```bash
npm uninstall react-router-dom
npm install react-router@7.10.0
```

**Import changes required** in all files:
```javascript
// OLD
import { ... } from "react-router-dom"

// NEW
import { ... } from "react-router/dom"
```

**Automated find/replace:**
```bash
find ./src -type f \( -name "*.jsx" -o -name "*.js" \) \
  -exec sed -i 's|from "react-router-dom"|from "react-router/dom"|g' {} +
```

**Files affected:**
- src/index.jsx
- src/utils.js
- src/components/Header.jsx
- src/components/Layout.jsx
- src/components/HostLayout.jsx
- src/pages/Vans/VanDetail.jsx
- src/pages/Vans/Vans.jsx
- src/pages/Host/* (all host pages)
- All other components using routing

#### 2. Future Flags Configuration

**Add to src/index.jsx before upgrading:**

```javascript
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* all existing routes */}
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
)

function App() {
  return (
    <AuthProvider>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true
        }}
      />
    </AuthProvider>
  )
}
```

#### 3. React.lazy Compatibility Check

**Issue:** `v7_startTransition` flag is incompatible with `React.lazy()` inside components.

**Action:**
```bash
# Search for React.lazy usage
grep -r "React.lazy" src/
```

If found, move to module scope:
```javascript
// ❌ BAD (inside component)
function MyComponent() {
  const LazyComponent = React.lazy(() => import('./Heavy'))
  return <LazyComponent />
}

// ✅ GOOD (module scope)
const LazyComponent = React.lazy(() => import('./Heavy'))
function MyComponent() {
  return <LazyComponent />
}
```

#### 4. formMethod Normalization

**Check src/pages/Login.jsx** for form method comparisons:

```javascript
// OLD
if (navigation.formMethod === "post") { }

// NEW (v7)
if (navigation.formMethod === "POST") { }
```

### Compatible Patterns (✅ No Changes Needed)

- ✅ createBrowserRouter with loader functions
- ✅ Nested routes with Outlet
- ✅ Protected routes using requireAuth()
- ✅ location.state for navigation context
- ✅ Error boundaries with errorElement
- ✅ Link and NavLink components
- ✅ useOutletContext pattern

### React Router 7 Migration Steps

1. **Enable future flags in v6.4.3** (test each individually)
2. **Test thoroughly** with flags enabled
3. **Create feature branch**:
   ```bash
   git checkout -b upgrade-react-router-v7
   ```
4. **Uninstall and install**:
   ```bash
   npm uninstall react-router-dom
   npm install react-router@7.10.0
   ```
5. **Update all imports** (automated command above)
6. **Verify imports manually** in key files
7. **Remove future flags** (now default in v7)
8. **Test thoroughly**
9. **Build for production**
10. **Commit and create PR**

---

## Recommended Migration Strategy

### Option A: Sequential Migration (Recommended - Lower Risk)

**Phase 1: Safe Dependencies (✅ COMPLETED)**
- ✅ Firebase 12.1.0 → 12.6.0
- ✅ Vite 7.1.3 → 7.2.6
- ✅ @vitejs/plugin-react 5.0.1 → 5.1.1
- ✅ MirageJS 0.1.46 → 0.1.48

**Phase 2: React 19 Upgrade (✅ COMPLETED)**
1. ✅ Upgrade to React 18.3.1 (test for warnings)
2. ✅ Fix any deprecation warnings (none found)
3. ✅ Upgrade to React 19.2.1
4. ✅ Test thoroughly (build & dev server successful)
5. ✅ Commit: "Upgrade React to v19.2.1"

**Phase 3: React Router 7 Upgrade (✅ COMPLETED)**
1. ✅ Enable future flags in v6.4.3
2. ✅ Test with flags enabled
3. ✅ Upgrade to React Router 7.10.0
4. ✅ Update imports (react-router-dom → react-router)
5. ✅ Remove defer() utility (now return promises directly)
6. ✅ Test thoroughly (build & dev server successful)
7. ✅ Commit: "Upgrade React Router to v7.10.0"

**Timeline:** 4-8 hours total
- Phase 2: 2-4 hours
- Phase 3: 2-4 hours

### Option B: Combined Migration (Higher Risk, Faster)

Upgrade both React 19 and React Router 7 simultaneously.

**Pros:**
- Single testing cycle
- One migration PR

**Cons:**
- Harder to isolate issues
- More complex rollback

**Timeline:** 3-6 hours

**Recommendation:** Use **Option A** for safer migration.

---

## Testing Strategy

### Pre-Migration Checklist

- [x] All tests passing (if any)
- [x] Application builds successfully
- [x] Dev server runs without errors
- [x] All routes accessible
- [x] Authentication flow works

### Testing After Each Migration Phase

#### Core Functionality Tests

**Navigation:**
- [ ] Home page loads (`/`)
- [ ] About page loads (`/about`)
- [ ] Van listings load (`/vans`)
- [ ] Van detail page loads (`/vans/:id`)
- [ ] Back button preserves filter context
- [ ] Not found page for invalid routes (`/*`)

**Authentication:**
- [ ] Login with valid credentials
- [ ] Login error handling (invalid credentials)
- [ ] Logout functionality
- [ ] Protected routes redirect to login
- [ ] Redirect back to original route after login

**Host Dashboard (Protected Routes):**
- [ ] Dashboard loads (`/host`)
- [ ] Income page loads (`/host/income`)
- [ ] Reviews page loads (`/host/reviews`)
- [ ] Host vans list loads (`/host/vans`)
- [ ] Host van detail loads (`/host/vans/:id`)
- [ ] Nested tabs work (Info/Pricing/Photos)

**Error Handling:**
- [ ] Error boundaries display on API errors
- [ ] Error component shows proper messages
- [ ] Failed loaders trigger error boundaries

**Data & Firebase:**
- [ ] Firebase Authentication works
- [ ] Firestore queries return data
- [ ] User session persists on refresh
- [ ] All van data loads correctly

**Build & Production:**
- [x] `npm run build` completes successfully
- [ ] `npm run preview` works
- [ ] No console errors in production build
- [ ] Assets load correctly

### Browser Testing

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (responsive design)

### Performance Checks

- [ ] Initial page load time acceptable
- [ ] Navigation feels snappy
- [ ] No memory leaks (use DevTools Memory tab)
- [ ] No infinite re-renders

---

## Rollback Procedures

### Rollback React 19

```bash
# Revert to React 18
npm install react@18.2.0 react-dom@18.2.0

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Test
npm run dev
```

### Rollback React Router 7

```bash
# Uninstall React Router 7
npm uninstall react-router

# Reinstall v6
npm install react-router-dom@6.4.3

# Revert imports
find ./src -type f \( -name "*.jsx" -o -name "*.js" \) \
  -exec sed -i 's|from "react-router/dom"|from "react-router-dom"|g' {} +

# Remove future flags from router configuration

# Test
npm run dev
```

### Rollback Both

```bash
# Revert package.json and package-lock.json
git checkout HEAD~1 -- package.json package-lock.json

# Reinstall dependencies
rm -rf node_modules
npm install

# Revert code changes if needed
git checkout HEAD~1 -- src/

# Test
npm run dev
```

---

## Risk Assessment

### Low Risk ✅

**React 19:**
- Already using modern patterns (hooks, Context API)
- No deprecated APIs in codebase
- Vite already configured for automatic JSX transform
- Simple component structure

**React Router 7:**
- Core routing logic compatible
- Loader pattern already v7-ready
- No deprecated router features in use
- Clean nested route structure

### Medium Risk ⚠️

**React 19:**
- Third-party library compatibility (especially MirageJS)
- Firebase integration needs verification

**React Router 7:**
- Package import changes (bulk find/replace risk)
- Future flag configuration and testing

### High Risk ❌

None identified for this codebase.

---

## Post-Migration Optimization

### Optional Enhancements (After Migration Stabilizes)

**React 19 Features:**
1. Refactor Login.jsx to use `useActionState`
2. Refactor form buttons to use `useFormStatus`
3. Simplify AuthContext.jsx to use `<AuthContext>` provider syntax
4. Add error handling callbacks in createRoot

**React Router 7 Features:**
1. Add View Transitions for smoother navigation
2. Implement `clientLoader` for caching van data
3. Add prefetching for van listings
4. Consider Framework Mode for future SSR needs

**Code Quality:**
1. Remove `import React from "react"` from all files (use codemod)
2. Add TypeScript for better type safety
3. Add automated testing suite
4. Set up error monitoring (Sentry, etc.)

---

## Resources

**React 19:**
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [React 19 Release](https://react.dev/blog/2024/12/05/react-19)
- [React Changelog](https://github.com/facebook/react/blob/main/CHANGELOG.md)

**React Router 7:**
- [Upgrading from v6 | React Router](https://reactrouter.com/upgrading/v6)
- [React Router v7 Changelog](https://reactrouter.com/changelog)
- [React Router v7 Blog Post](https://remix.run/blog/react-router-v7)

**Migration Tools:**
- [React 19 Codemods](https://docs.codemod.com/guides/migrations/react-18-19)
- [React Router Future Flags](https://reactrouter.com/en/main/upgrading/future)

---

## Next Steps

1. ✅ Safe dependencies updated (completed)
2. ✅ Review this migration plan
3. ✅ Decide on migration strategy (Option A - Sequential)
4. ✅ Schedule migration work
5. ✅ Create backup/snapshot of current working state
6. ✅ Complete Phase 2: React 19 migration
7. ✅ Test and commit React 19
8. ✅ Complete Phase 3: React Router 7 migration
9. ✅ Test and commit React Router 7
10. ⏳ **CURRENT**: Merge feature branch and monitor production for issues

---

## Migration Complete! ✅

**Date Completed:** December 3, 2025
**Branch:** `upgrade-react-19`
**Commits:**
- `b171b2c` - Upgrade React to v19.2.1
- `ed08f39` - Upgrade React Router to v7.10.0

**Final Versions:**
- React: 19.2.1 ✅
- React DOM: 19.2.1 ✅
- React Router: 7.10.0 ✅

**Key Changes:**
- ✅ Removed `defer()` from loaders - now return promises directly
- ✅ Updated all imports from `react-router-dom` to `react-router`
- ✅ Removed future flags (now default in v7)
- ✅ Verified `createRoot()` usage in src/index.jsx
- ✅ Build and dev server working successfully

**Remaining Tasks:**
- [ ] Merge `upgrade-react-19` branch to main
- [ ] Test thoroughly in production environment
- [ ] Optional: Remove `import React from "react"` from all 22 .jsx files (not required)
- [ ] Optional: Adopt new React 19 features (useActionState, simplified Context, etc.)

---

**Questions or concerns?** Review the detailed research documents or consult the official documentation linked above.
