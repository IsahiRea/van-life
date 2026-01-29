# Feature Roadmap

This document outlines planned features to enhance the Van Life application, transforming it from a browsing platform into a full-featured van rental marketplace.

---

## Table of Contents

1. [Van Booking & Reservations](#1-van-booking--reservations)
2. [User Reviews & Ratings](#2-user-reviews--ratings)
3. [Image Upload for Hosts](#3-image-upload-for-hosts)
4. [Search & Filtering](#4-search--filtering)
5. [Implementation Priority](#5-implementation-priority)

---

## 1. Van Booking & Reservations

### Overview

Enable users to book vans for specific date ranges, with hosts able to manage availability and view upcoming reservations.

### Data Model

**Firestore Collection: `bookings`**

```javascript
{
  id: string,                    // Auto-generated document ID
  vanId: string,                 // Reference to van document

  // User Info (denormalized for query efficiency)
  userId: string,                // Booking user's UID
  userEmail: string,
  userName: string,

  // Host Info
  hostId: string,                // Van owner's UID

  // Booking Details
  startDate: Timestamp,
  endDate: Timestamp,
  totalDays: number,
  pricePerDay: number,
  totalPrice: number,

  // Status Management
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',

  // Timestamps
  createdAt: Timestamp,
  updatedAt: Timestamp,
  confirmedAt: Timestamp | null,
  cancelledAt: Timestamp | null
}
```

**Firestore Collection: `availability`** (for blocking dates)

```javascript
{
  id: string,
  vanId: string,
  blockedDates: Timestamp[],     // Dates unavailable for booking
  updatedAt: Timestamp
}
```

### API Functions

```javascript
// src/lib/api.js

// Create a new booking
export async function createBooking({ vanId, startDate, endDate }) {
  // 1. Verify user is authenticated
  // 2. Check date availability
  // 3. Calculate pricing
  // 4. Create booking document
  // 5. Update availability (block dates)
  // Returns: booking object
}

// Get user's bookings (as renter)
export async function getUserBookings() {
  // Query bookings where userId === currentUser.uid
  // Order by startDate descending
}

// Get host's bookings (as van owner)
export async function getHostBookings() {
  // Query bookings where hostId === currentUser.uid
  // Order by startDate descending
}

// Update booking status (for hosts)
export async function updateBookingStatus(bookingId, status) {
  // Verify current user is the host
  // Update status and relevant timestamp
  // If cancelled, unblock dates
}

// Cancel booking (for renters)
export async function cancelBooking(bookingId) {
  // Verify current user is the booker
  // Check cancellation policy (e.g., 48 hours before)
  // Update status to 'cancelled'
  // Unblock dates
}

// Check van availability
export async function checkAvailability(vanId, startDate, endDate) {
  // Query bookings for vanId with overlapping dates
  // Return { available: boolean, conflictingDates: Date[] }
}
```

### UI Components

**New Pages:**
- `/bookings` - User's booking history
- `/host/bookings` - Host's reservation management
- `/vans/:id/book` - Booking flow page

**New Components:**
- `DateRangePicker` - Calendar for selecting start/end dates
- `BookingCard` - Display booking summary
- `BookingConfirmation` - Confirmation modal/page
- `AvailabilityCalendar` - Show available/blocked dates
- `BookingStatusBadge` - Visual status indicator

### User Flows

**Renter Booking Flow:**
1. Browse vans → Select van → View details
2. Click "Book Now" → Select dates on calendar
3. Review pricing breakdown → Confirm booking
4. Receive confirmation → View in "My Bookings"

**Host Management Flow:**
1. Receive notification of new booking
2. View booking details in Host Dashboard
3. Confirm or decline booking
4. View upcoming reservations calendar

### Security Rules

```javascript
// Firestore Security Rules
match /bookings/{bookingId} {
  // Users can read their own bookings
  allow read: if request.auth.uid == resource.data.userId
              || request.auth.uid == resource.data.hostId;

  // Authenticated users can create bookings
  allow create: if request.auth != null
                && request.auth.uid == request.resource.data.userId;

  // Only hosts can confirm/decline, only renters can cancel
  allow update: if request.auth.uid == resource.data.hostId
                || request.auth.uid == resource.data.userId;
}
```

---

## 2. User Reviews & Ratings

### Overview

Allow renters to review vans after completed trips, with aggregate ratings displayed on van listings.

### Data Model

**Firestore Collection: `reviews`**

```javascript
{
  id: string,
  vanId: string,

  // Reviewer Info
  userId: string,
  userName: string,
  userPhotoURL: string | null,

  // Linked booking (ensures one review per booking)
  bookingId: string,

  // Review Content
  rating: number,                // 1-5 stars
  title: string,                 // Optional headline
  comment: string,

  // Optional category ratings
  cleanliness: number,           // 1-5
  communication: number,         // 1-5
  accuracy: number,              // 1-5
  value: number,                 // 1-5

  // Host Response
  hostResponse: string | null,
  hostResponseAt: Timestamp | null,

  // Metadata
  tripDate: Timestamp,           // When the trip occurred
  createdAt: Timestamp,
  updatedAt: Timestamp,

  // Moderation
  status: 'published' | 'flagged' | 'removed',
  helpful: number                // Count of "helpful" votes
}
```

**Van Document Update:**

```javascript
// Add to existing van documents
{
  // ... existing fields

  // Aggregate review data (denormalized)
  reviewStats: {
    averageRating: number,       // Calculated average
    totalReviews: number,
    ratingDistribution: {        // For histogram display
      1: number,
      2: number,
      3: number,
      4: number,
      5: number
    }
  }
}
```

### API Functions

```javascript
// src/lib/api.js

// Create a review (after completed booking)
export async function createReview({ bookingId, rating, title, comment, categoryRatings }) {
  // 1. Verify booking exists and belongs to user
  // 2. Verify booking status is 'completed'
  // 3. Check no existing review for this booking
  // 4. Create review document
  // 5. Update van's aggregate reviewStats
}

// Get reviews for a van
export async function getVanReviews(vanId, { limit = 10, orderBy = 'createdAt' }) {
  // Query reviews for vanId
  // Support pagination and sorting
}

// Get user's reviews (what they've written)
export async function getUserReviews() {
  // Query reviews where userId === currentUser.uid
}

// Add host response to review
export async function addHostResponse(reviewId, response) {
  // Verify current user owns the van
  // Add response text and timestamp
}

// Mark review as helpful
export async function markReviewHelpful(reviewId) {
  // Increment helpful counter
  // Track user's vote to prevent duplicates
}

// Update van review stats (Cloud Function recommended)
export async function updateVanReviewStats(vanId) {
  // Recalculate averageRating, totalReviews, distribution
  // Update van document
}
```

### UI Components

**New Pages:**
- `/vans/:id/reviews` - Full reviews page for a van
- `/bookings/:id/review` - Write review form

**New Components:**
- `StarRating` - Interactive/display star component
- `ReviewCard` - Individual review display
- `ReviewForm` - Multi-step review submission
- `ReviewStats` - Aggregate stats with histogram
- `HostResponseForm` - For hosts to respond
- `ReviewPrompt` - CTA after completed booking

### User Flows

**Writing a Review:**
1. Complete a booking (trip ends)
2. Receive prompt to leave review (email/in-app)
3. Navigate to booking → Click "Write Review"
4. Rate overall + categories → Write comment
5. Submit → Review appears on van page

**Host Response:**
1. Notification of new review
2. View review in dashboard
3. Click "Respond" → Write response
4. Response appears below review

### Display Integration

```jsx
// VanDetail.jsx - Add review section
<section className="van-reviews">
  <ReviewStats stats={van.reviewStats} />
  <ReviewList vanId={van.id} limit={5} />
  <Link to={`/vans/${van.id}/reviews`}>See all reviews</Link>
</section>
```

---

## 3. Image Upload for Hosts

### Overview

Enable hosts to upload multiple images for their vans using Firebase Storage, with image optimization and gallery management.

### Firebase Storage Structure

```
/vans/{vanId}/
  ├── primary.jpg           # Main listing image
  ├── gallery/
  │   ├── 1.jpg
  │   ├── 2.jpg
  │   └── ...
  └── thumbnails/           # Auto-generated (via Cloud Function)
      ├── primary_thumb.jpg
      └── gallery/
          ├── 1_thumb.jpg
          └── ...
```

### Data Model Update

**Van Document:**

```javascript
{
  // ... existing fields

  // Replace single imageUrl with array
  images: {
    primary: {
      url: string,
      thumbnailUrl: string,
      path: string,           // Storage path for deletion
    },
    gallery: [
      {
        id: string,
        url: string,
        thumbnailUrl: string,
        path: string,
        order: number,
        caption: string | null
      }
    ]
  }
}
```

### API Functions

```javascript
// src/lib/api.js

import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const storage = getStorage(app);

// Upload van image
export async function uploadVanImage(vanId, file, type = 'gallery') {
  // 1. Verify user owns the van
  // 2. Validate file (type, size)
  // 3. Generate unique filename
  // 4. Upload to Firebase Storage
  // 5. Get download URL
  // 6. Update van document
  // Returns: { url, path }
}

// Delete van image
export async function deleteVanImage(vanId, imagePath) {
  // 1. Verify user owns the van
  // 2. Delete from Storage
  // 3. Update van document
}

// Reorder gallery images
export async function reorderVanImages(vanId, imageOrder) {
  // Update order field for each image
}

// Set primary image
export async function setPrimaryImage(vanId, imageId) {
  // Swap current primary with selected gallery image
}

// Image validation helper
function validateImage(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Use JPEG, PNG, or WebP.');
  }
  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 5MB.');
  }
  return true;
}
```

### Cloud Function for Thumbnails

```javascript
// functions/src/index.js (Firebase Cloud Functions)

const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

exports.generateThumbnail = functions.storage
  .object()
  .onFinalize(async (object) => {
    // 1. Check if file is in /vans/ directory
    // 2. Check if already a thumbnail
    // 3. Download image
    // 4. Resize with sharp (e.g., 300x200)
    // 5. Upload to thumbnails folder
    // 6. Update Firestore document with thumbnail URL
  });
```

### UI Components

**New Components:**
- `ImageUploader` - Drag-drop or click-to-upload
- `ImageGallery` - Display with lightbox
- `ImageManager` - Host interface for managing images
- `ImageReorder` - Drag-and-drop reordering
- `ProgressBar` - Upload progress indicator

**Updated Pages:**
- `/host/vans/:id/photos` - Enhanced with upload functionality
- `/host/vans/new` - Add van creation with image upload

### User Flow

**Uploading Images:**
1. Navigate to Host Van → Photos tab
2. Click "Add Photos" or drag files
3. See upload progress
4. Reorder by dragging
5. Click image to set as primary
6. Click trash icon to delete

### Storage Security Rules

```javascript
// Firebase Storage Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /vans/{vanId}/{allPaths=**} {
      // Only van owner can upload/delete
      allow write: if request.auth != null
                   && isVanOwner(vanId);

      // Anyone can read (public van images)
      allow read: if true;
    }

    function isVanOwner(vanId) {
      return firestore.get(/databases/(default)/documents/vans/$(vanId)).data.hostId == request.auth.uid;
    }
  }
}
```

---

## 4. Search & Filtering

### Overview

Implement server-side search and filtering to handle large datasets efficiently, with URL-persisted filter state.

### Firestore Indexes

Create composite indexes for common query patterns:

```javascript
// firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "vans",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "type", "order": "ASCENDING" },
        { "fieldPath": "price", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "vans",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "location.state", "order": "ASCENDING" },
        { "fieldPath": "price", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "vans",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "type", "order": "ASCENDING" },
        { "fieldPath": "reviewStats.averageRating", "order": "DESCENDING" }
      ]
    }
  ]
}
```

### Data Model Enhancement

**Van Document (add fields for filtering):**

```javascript
{
  // ... existing fields

  // Location data
  location: {
    city: string,
    state: string,
    country: string,
    coordinates: GeoPoint    // For proximity search
  },

  // Features for filtering
  features: string[],        // ['wifi', 'kitchen', 'bathroom', 'solar', 'ac']
  capacity: number,          // Number of people

  // Derived/computed (for efficient queries)
  priceRange: 'budget' | 'mid' | 'premium',
  isAvailable: boolean,      // Quick availability flag

  // Search optimization
  searchTerms: string[]      // Lowercase name, type, location for text search
}
```

### API Functions

```javascript
// src/lib/api.js

// Enhanced getVans with filtering
export async function getVans(filters = {}) {
  const {
    type,           // 'simple' | 'rugged' | 'luxury'
    minPrice,
    maxPrice,
    location,       // State or city
    features,       // Array of required features
    capacity,       // Minimum capacity
    sortBy,         // 'price' | 'rating' | 'newest'
    sortOrder,      // 'asc' | 'desc'
    limit = 20,
    startAfter      // For pagination
  } = filters;

  let q = query(vansCollectionRef);

  // Apply filters
  if (type) {
    q = query(q, where('type', '==', type));
  }
  if (minPrice) {
    q = query(q, where('price', '>=', minPrice));
  }
  if (maxPrice) {
    q = query(q, where('price', '<=', maxPrice));
  }
  if (location) {
    q = query(q, where('location.state', '==', location));
  }
  if (features?.length) {
    q = query(q, where('features', 'array-contains-any', features));
  }
  if (capacity) {
    q = query(q, where('capacity', '>=', capacity));
  }

  // Apply sorting
  if (sortBy) {
    q = query(q, orderBy(sortBy, sortOrder || 'asc'));
  }

  // Apply pagination
  q = query(q, limit(limit));
  if (startAfter) {
    q = query(q, startAfter(startAfter));
  }

  const snapshot = await getDocs(q);
  return {
    vans: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
    hasMore: snapshot.docs.length === limit
  };
}

// Text search (using searchTerms array)
export async function searchVans(searchQuery) {
  const terms = searchQuery.toLowerCase().split(' ');

  // Firestore doesn't support full-text search natively
  // Option 1: Use array-contains for simple matching
  const q = query(
    vansCollectionRef,
    where('searchTerms', 'array-contains-any', terms)
  );

  // Option 2: Use Algolia or Typesense for advanced search
  // return algoliaIndex.search(searchQuery);
}

// Get filter options (for dynamic filter UI)
export async function getFilterOptions() {
  // Aggregate unique values for each filter
  // Cache results as they don't change often
  return {
    types: ['simple', 'rugged', 'luxury'],
    locations: ['California', 'Oregon', 'Washington', ...],
    features: ['wifi', 'kitchen', 'bathroom', 'solar', 'ac'],
    priceRange: { min: 50, max: 500 }
  };
}
```

### URL State Management

```javascript
// src/hooks/useVanFilters.js

import { useSearchParams } from 'react-router';

export function useVanFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    type: searchParams.get('type'),
    minPrice: searchParams.get('minPrice'),
    maxPrice: searchParams.get('maxPrice'),
    location: searchParams.get('location'),
    features: searchParams.getAll('feature'),
    sortBy: searchParams.get('sort') || 'newest'
  };

  const setFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return { filters, setFilter, clearFilters };
}
```

### UI Components

**New Components:**
- `SearchBar` - Text search input with suggestions
- `FilterPanel` - Collapsible filter sidebar
- `FilterChips` - Active filter display with remove
- `PriceRangeSlider` - Min/max price selector
- `FeatureCheckboxes` - Multi-select for features
- `SortDropdown` - Sort options
- `Pagination` - Load more / page numbers
- `NoResults` - Empty state with suggestions

**Updated Loader:**

```javascript
// src/pages/Vans/Vans.jsx

export async function loader({ request }) {
  const url = new URL(request.url);
  const filters = {
    type: url.searchParams.get('type'),
    minPrice: url.searchParams.get('minPrice'),
    maxPrice: url.searchParams.get('maxPrice'),
    location: url.searchParams.get('location'),
    features: url.searchParams.getAll('feature'),
    sortBy: url.searchParams.get('sort')
  };

  return getVans(filters);
}
```

### Considerations for Scale

**For larger datasets (1000+ vans):**

1. **Algolia Integration** - For full-text search
   ```javascript
   // Use Algolia for search, Firestore for detail fetches
   const hits = await algoliaIndex.search(query, {
     filters: `type:${type} AND price >= ${minPrice}`
   });
   ```

2. **Cloud Functions for Aggregations**
   ```javascript
   // Precompute filter counts
   exports.updateFilterCounts = functions.firestore
     .document('vans/{vanId}')
     .onWrite(async () => {
       // Update counts for each filter option
     });
   ```

3. **Caching with React Query**
   ```javascript
   const { data, isLoading } = useQuery(
     ['vans', filters],
     () => getVans(filters),
     { staleTime: 5 * 60 * 1000 }
   );
   ```

---

## 5. Implementation Priority

### Phase 1: Foundation (Recommended First)

| Feature | Effort | Impact | Dependencies |
|---------|--------|--------|--------------|
| Search & Filtering | Medium | High | None |
| Image Upload | Medium | High | None |

**Rationale:** These features improve the core browsing experience without requiring new user flows.

### Phase 2: Core Marketplace

| Feature | Effort | Impact | Dependencies |
|---------|--------|--------|--------------|
| Van Booking | High | Critical | Image Upload (optional) |

**Rationale:** Transforms the app from showcase to functional marketplace.

### Phase 3: Trust & Community

| Feature | Effort | Impact | Dependencies |
|---------|--------|--------|--------------|
| User Reviews | Medium | High | Booking System |

**Rationale:** Reviews require completed bookings to be meaningful.

### Suggested Timeline

```
Phase 1 (Weeks 1-2)
├── Implement search & filtering
├── Add image upload for hosts
└── Update van listing UI

Phase 2 (Weeks 3-5)
├── Build booking data model
├── Create booking flow UI
├── Add host booking management
└── Implement availability calendar

Phase 3 (Weeks 6-7)
├── Build review system
├── Add aggregate ratings to listings
└── Create host response feature
```

---

## Future Considerations

Features to consider after core implementation:

- **Payments** - Stripe integration for secure payments
- **Messaging** - Real-time chat between hosts and renters
- **Notifications** - Email/push for booking updates
- **Favorites** - Save vans to wishlist
- **Host Verification** - Identity verification badges
- **Insurance** - Trip protection options
- **Mobile App** - React Native companion app
