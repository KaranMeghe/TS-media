<!-- @format -->

# Albums Feature (Redux Toolkit Query)

This feature manages **albums data** using **Redux Toolkit Query (RTK Query)** for efficient API caching and synchronization.

---

## Goal

- Fetch albums from an external API (JSON SERVER) for a specific user
- Display albums in an organized, interactive UI
- Create new albums with auto-generated titles
- Delete existing albums
- Handle loading and error states correctly
- Auto-cache and intelligently invalidate data using RTK Query tags
- Prevent unnecessary API calls with automatic caching

This feature is implemented using **RTK QUERY** for simplified async state management with minimal boilerplate.

---

## Design Decisions

### Why RTK Query?

- **Automatic Caching**: RTK Query caches data automatically, reducing unnecessary API calls
- **Tag-based Invalidation**: Using tags (Album by userId) ensures smart cache invalidation
- **Built-in Loading/Error States**: Hooks provide `isLoading`, `data`, and `error` states out-of-the-box
- **Less Boilerplate**: No need for manual action creators, reducers, or extra middleware
- **Request Deduplication**: Multiple identical requests are automatically deduplicated
- **Better DX**: Cleaner API compared to Redux thunks with less code to maintain

---

### Why User-Specific Album Tags?

Albums are scoped by userId, so:

- **Tag Type**: `Album`
- **Tag ID**: `userId`

This ensures that when an album is added/deleted for a specific user, only that user's album list is invalidated and refetched. Other users' album caches remain intact, improving performance.

---

### Why Auto-Generated Titles with Faker?

The `addAlbum` mutation generates random product names using `@faker-js/faker` library:

- Provides realistic demo data
- Eliminates need for form inputs in this simplified version
- Shows how to use external libraries in mutations

---

## State Shape

The albums data is managed by RTK Query:

```typescript
albums: {
  [queryKey]: {
    data: AlbumData[],      // Array of albums
    isLoading: boolean,     // Fetching albums
    isFetching: boolean,    // Background refetch
    error: any,             // Error if fetch fails
    status: 'pending' | 'fulfilled' | 'rejected'
  }
}
```

---

## API Endpoints

### fetchAlbums (Query)

Fetch all albums for a specific user.

```
Method:    GET
Endpoint:  /albums?userId={userId}
Type:      Query
Tag:       { type: "Album", id: userId }
Returns:   AlbumData[]
```

**Usage:**

```tsx
const { data, isLoading, error } = useFetchAlbumsQuery(user);
```

---

### addAlbum (Mutation)

Create a new album with auto-generated title.

```
Method:             POST
Endpoint:           /albums
Type:               Mutation
Body:               { userId: string, title: string (auto-generated) }
Invalidates Tag:    { type: "Album", id: userId }
Returns:            AlbumData
```

**Usage:**

```tsx
const [addAlbum, { isLoading }] = useAddAlbumMutation();
addAlbum(user);
```

---

### removeAlbum (Mutation)

Delete an album.

```
Method:             DELETE
Endpoint:           /albums/{albumId}
Type:               Mutation
Invalidates Tag:    { type: "Album", id: userId }
Returns:            AlbumData
```

**Usage:**

```tsx
const [removeAlbum, { isLoading }] = useRemoveAlbumMutation();
removeAlbum(album);
```

---

## Type Definitions

### AlbumData

```typescript
interface AlbumData {
  id: string;
  title: string;
  userId: string;
}
```

### AlbumsProps

```typescript
interface AlbumsProps {
  user: USER;
}
```

### AlbumTitleProps

```typescript
interface AlbumTitleProps {
  user: USER;
}
```

### AlbumItemProps

```typescript
interface AlbumItemProps {
  album: AlbumData;
}
```

---

## Caching Behavior

RTK Query automatically caches albums in the Redux store.

**Cache is identified using:**

- Endpoint name
- Query arguments (userId)

**Example cache key:** `fetchAlbums(userId)`

**Benefits:**

- Prevents duplicate API calls
- Improves performance by loading cached data instantly
- Reduces backend load
- Deduplicates in-flight requests

---

## Cache Invalidation Flow

When an album is added or deleted:

1. Mutation is triggered
2. API request executes
3. Cache tag is invalidated: `{ type: "Album", id: userId }`
4. RTK Query finds all related cached data matching the tag
5. RTK Query automatically refetches albums for that user
6. Redux store updates cache with fresh data
7. UI components rerender with updated data

---

## Generated Hooks

RTK Query automatically generates hooks for API endpoints.

### Query Hook

**useFetchAlbumsQuery(user)**

Provides:

- `data: AlbumData[]` - Array of albums
- `isLoading: boolean` - Initial load state
- `isFetching: boolean` - Background refetch state
- `error: any` - Error object if query fails
- `refetch: () => void` - Manual refetch trigger

---

### Mutation Hooks

**useAddAlbumMutation()**

Returns: `[mutationFn, { isLoading, isSuccess, isError, error, data }]`

**useRemoveAlbumMutation()**

Returns: `[mutationFn, { isLoading, isSuccess, isError, error, data }]`

---

## Component Structure

### Albums.tsx (Root Component)

Main container that orchestrates the album feature.

```tsx
import Albums from '@/components/Albums';

<Albums user={currentUser} />;
```

**Renders:**

- `AlbumTitle` - Header with add album button
- `AlbumList` - List of albums

---

### AlbumTitle.tsx

Displays the album section title and "+ Album" button.

**Props:** `user: USER`

**Hooks:**

- `useAlbum()` - Get `handleAddAlbum` function

**Features:**

- Shows user's albums heading
- Button to create new album
- Shows loading state while adding

---

### AlbumList.tsx

Fetches and displays all albums for a user.

**Props:** `user: USER`

**Hooks:**

- `useFetchAlbumsQuery(user)` - Fetch albums
- Shows skeleton loading while fetching
- Displays error message if fetch fails

**Features:**

- Fetches albums for specific user
- Shows loading skeleton placeholder
- Maps and renders AlbumItem for each album
- Error handling for failed requests

---

### AlbumItem.tsx

Individual album card component.

**Props:** `album: AlbumData`

**Hooks:**

- `useAlbum()` - Get `handleRemoveAlbum` function and results

**Features:**

- Displays album title
- Delete button with loading state
- Expandable panel for future photo content
- Shows delete button spinner during deletion

---

### useAlbum.ts (Custom Hook)

Encapsulates mutation logic and provides handler functions.

```tsx
const useAlbum = () => {
  const [addAlbum, results] = useAddAlbumMutation();
  const [removeAlbum, reslutsAlbum] = useRemoveAlbumMutation();

  const handleAddAlbum = (user: USER) => {
    addAlbum(user);
  };

  const handleRemoveAlbum = (album: AlbumData) => {
    removeAlbum(album);
  };

  return { handleAddAlbum, handleRemoveAlbum, results, reslutsAlbum };
};
```

**Returns:**

- `handleAddAlbum(user)` - Function to add album
- `handleRemoveAlbum(album)` - Function to remove album
- `results` - Mutation result from addAlbum
- `reslutsAlbum` - Mutation result from removeAlbum

**Usage:**

```tsx
const { handleRemoveAlbum, reslutsAlbum } = useAlbum();
```

---

## Error Handling

The feature handles errors at multiple levels:

### Query Errors (Fetching Albums)

```tsx
const { data, error, isLoading } = useFetchAlbumsQuery(user);

if (error) {
  return <div>Error Loading Albums</div>;
}
```

**Scenarios:**

- Network failure
- Server errors (5xx)
- Invalid userId
- User unauthorized

---

### Mutation Errors (Add/Delete)

```tsx
const [removeAlbum, { isLoading, error }] = useRemoveAlbumMutation();

if (error) {
  // Show error toast or notification
}
```

**Scenarios:**

- Network failure during add/delete
- Album not found (delete)
- User unauthorized
- Server validation errors

---

## Data Flow

```
UI Component (AlbumItem/AlbumTitle)
        ↓
useAlbum Hook
        ↓
RTK Query Hooks (useMutation/useQuery)
        ↓
albumsApi Endpoints
        ↓
API Request (JSON Server)
        ↓
Redux Store Cache Update
        ↓
Component Rerender via Hook
```

### Flow Steps:

1. UI component calls mutation/query via RTK Query hooks
2. RTK Query executes API request
3. Redux store updates cache automatically
4. UI components rerender with new data
5. Automatic refetch on tag invalidation

---

## File Structure

```
Albums/
├── README.md (this file)
├── album.type.ts (TypeScript interfaces)
├── Albums.tsx (root component)
├── AlbumList.tsx (list container)
├── AlbumItem.tsx (individual album card)
├── AlbumTitle.tsx (header with add button)
└── useAlbum.ts (custom hook)
```

---

## Related Components

- **Users Component** - Parent that integrates Albums feature
- **Skeleton Component** - Loading placeholder for albums
- **Button Component** - Reusable button for add/delete actions
- **ExpandablePanel Component** - Panel for expandable album details
- **Photos Component** - Future integration for album photos

---

## Dependencies

```json
{
  "@reduxjs/toolkit": "^1.9+",
  "@reduxjs/toolkit/query/react": "^1.9+",
  "react": "^18+",
  "@faker-js/faker": "^8+",
  "react-icons": "^4+"
}
```

---

## Redux Integration

RTK Query is registered in the Redux store:

**store.ts:**

```typescript
const store = configureStore({
  reducer: {
    albums: albumsApi.reducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(albumsApi.middleware),
});
```

**Middleware Handles:**

- API requests
- Cache management
- Refetch logic
- Component subscriptions
- Automatic cache invalidation

---

## Usage Example

```tsx
import Albums from '@/components/Albums';
import type { USER } from '@/redux/features/users/users.types';

const user: USER = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  // ... other user properties
};

function MyComponent() {
  return (
    <div>
      <h1>User Albums</h1>
      <Albums user={user} />
    </div>
  );
}

export default MyComponent;
```

---

## Benefits

✅ **Automatic Caching** - No manual cache management  
✅ **Automatic Refetching** - Smart tag-based invalidation  
✅ **Minimal Boilerplate** - Less code than Redux thunks  
✅ **Built-in Loading/Error States** - Included in hooks  
✅ **Scalable Architecture** - Easy to extend with more endpoints  
✅ **Request Deduplication** - Automatic in-flight request handling  
✅ **Type Safe** - Full TypeScript support  
✅ **Performance** - Prevents unnecessary re-renders

---

## Summary

This feature demonstrates complete album management using Redux Toolkit Query with:

- **Queries and Mutations** - For fetching and modifying data
- **Automatic Caching** - Built-in by RTK Query
- **Smart Cache Invalidation** - Tag-based invalidation
- **React Hooks Integration** - Easy-to-use hooks
- **Redux Integration** - Seamless store integration
- **Clean Architecture** - Organized component structure
- **Error Handling** - At query and mutation levels
- **Loading States** - For better UX

This approach provides a modern, maintainable solution for server state management in React applications.
