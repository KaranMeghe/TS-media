<!-- @format -->

# Albums Feature (Redux Toolkit Query)

This feature manages **albums data** using **Redux Toolkit Query (RTK Query)** for efficient API caching and synchronization

---

## Goal

- Fetch albums from an external API (JSON SERVER) for a specific user
- Display albums in the UI
- Create new albums with auto-generated titles
- Delete existing albums
- Handle loading and error states correctly
- Auto-cache and invalidate data using RTK Query tags

This feature is implemented using **RTK QUERY** for simplified async state management

---

## State shape

The albums slice manages following state through RTK Query:

- `albums[{},{}]`: list of albums for user,
- `isLoading`: loading state for fetching albums,
- `isLoadingAdd`: loading state for creating albums,
- `isLoadingDelete`: loading state for deleting albums,
- `error`: error while fetching albums,

RTK Query automatically manages cache and provides hooks with loading, data, and error states

---

## RTK Query Endpoints

### fetchAlbums (Query)

- Triggered when AlbumList component mounts
- Fetch all albums for a specific user from API
- Cached automatically by RTK Query
- Provides skeleton loading state
- Uses `providesTags` for automatic cache invalidation

**Endpoint:** `GET /albums?userId={userId}`

**Returns:** `AlbumData[]`

---

### addAlbum (Mutation)

- Triggered when user clicks on "+ Album" button in AlbumTitle
- Create new album with auto-generated title using Faker
- Post request with userId in body
- Show button-level loader during request
- Uses `invalidatesTags` to refresh album list for user

**Endpoint:** `POST /albums`

**Body:** `{ userId: string, title: string (auto-generated) }`

**Returns:** `AlbumData`

---

### removeAlbum (Mutation)

- Triggered when user clicks on "Delete" button in AlbumItem
- Delete album from the API
- Update Redux state with automatic tag invalidation
- Optimistic UI updates handled by RTK Query

**Endpoint:** `DELETE /albums/{id}`

**Returns:** `AlbumData`

---

## Design Decisions

### Why RTK Query ?

- **Automatic Caching**: RTK Query caches data automatically, reducing unnecessary API calls
- **Tag-based Invalidation**: Using tags (Album by userId) ensures smart cache invalidation
- **Built-in Loading/Error States**: Hooks provide `isLoading`, `data`, and `error` states out-of-the-box
- **Less Boilerplate**: No need for manual action creators or reducers
- **Request Deduplication**: Multiple identical requests are automatically deduplicated

---

### Why user-specific album tags?

Albums are scoped by userId, so:

- Tag type: `Album`
- Tag id: `userId`

This ensures that when an album is added/deleted for a specific user, only that user's album list is invalidated and refetched. Other users' album caches remain intact.

---

## Data Flow

```
UI Component (AlbumItem/AlbumTitle)
                ↓
        useAlbum hook
                ↓
    RTK Query Hooks (useMutation/useQuery)
                ↓
        albumsApi endpoints
                ↓
        External API (JSON Server)
                ↓
    Redux Store Cache Update
                ↓
    UI Components Rerender
```

1. UI component dispatches mutation/query via RTK Query hooks
2. RTK Query executes API request
3. Redux store updates cache
4. UI reacts to data changes via hooks
5. Automatic re-fetch on tag invalidation

---

## Component Structure

**Albums.tsx** (Root):

- Container for album display
- Renders AlbumTitle and AlbumList

**AlbumTitle.tsx**:

- Displays user album header
- "+ Album" button that triggers `useAddAlbumMutation`
- Uses `useAlbum` hook

**AlbumList.tsx**:

- Fetches albums using `useFetchAlbumsQuery`
- Shows skeleton loading state
- Maps and renders AlbumItem components

**AlbumItem.tsx**:

- Individual album card
- Delete button with loading state
- Expandable panel showing photos placeholder
- Uses `useAlbum` hook for delete functionality

**useAlbum.ts** (Custom Hook):

- Exports both mutations: `addAlbum`, `removeAlbum`
- Provides handler functions: `handleAddAlbum`, `handleRemoveAlbum`
- Returns mutation results for UI loading states

---

### Notes

- All async logic is handled by RTK Query endpoints
- UI components remain declarative and data-driven
- Cache invalidation is automatic via tags
- No additional Redux slices needed for albums
- Skeleton components provide better UX during loading
- Auto-generated titles use `@faker-js/faker` library
