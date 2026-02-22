# Albums & Photos Issues - Complete Debugging Summary

## Problem Overview
Users were seeing **all albums for every user** and **all photos for every album**. Each time you toggled an album or switched users, the app made repeated API calls instead of using cached data.

---

## Issue #1: Photos Displaying for All Albums

### The Problem
When you opened an album, you saw **all photos** regardless of which album you selected. Toggle an album twice → get repeated network requests.

### How I Found It
1. **Network Tab Analysis**: Checked the browser DevTools Network tab and saw `/photos` endpoint being called repeatedly
2. **Code Review**: Traced the flow:
   - `PhotoList.tsx` → `useFetchPhotosQuery(album)`
   - `photosApi.ts` → `fetchPhotos` endpoint

### Root Cause
```typescript
// WRONG - Passing entire object
useFetchPhotosQuery(album)  // album = { id: "aeb8", title: "...", userId: "d566" }
```

**Why this breaks RTK Query caching:**
- RTK Query uses function arguments as cache keys
- Each time the component renders, a NEW object reference is created: `{ id, title, userId }`
- RTK Query thinks it's a different query → doesn't use cache → makes new API call
- The query parameter wasn't serializable, confirming the issue

### My Approach
1. Checked `db.json` structure - photos had `albumId` field ✓
2. Looked at `photosApi.ts` - query correctly filtered by `albumId` ✓
3. Identified the query hook call - passing whole object ✗
4. Solution: Pass only the serializable ID string

### Fix Applied
```typescript
// RIGHT - Passing only the ID
useFetchPhotosQuery(album.id)  // album.id = "aeb8" (string, stable)
```

**Files Changed:**
- `photosApi.ts`: Changed `fetchPhotos` to accept `albumId: string` instead of `album: AlbumData`
- `PhotoList.tsx`: Changed `useFetchPhotosQuery(album)` → `useFetchPhotosQuery(album.id)`
- Added RTK Query options to prevent refetch-on-mount/focus/reconnect

---

## Issue #2: Albums Showing Same Albums for All Users

### The Problem
Every user saw the **same albums**, regardless of which user was selected. User 1 has albums A, B. Switch to User 2 → still see albums A, B.

### How I Found It
**Same approach as Issue #1:**
1. Checked `db.json` - all albums had `"userId": null` ⚠️
2. Checked `albumsApi.ts` - `fetchAlbums` was passing entire `user` object
3. RTK Query couldn't differentiate between users → cache collision

### Root Cause
```typescript
// WRONG - Passing entire object
useFetchAlbumsQuery(user)  // user = { id: "d566", name: "Rolando Rippin" }
// Cache key changes every render → new API call each time
```

### My Approach
1. Checked `AlbumList.tsx` - hook call with full user object
2. Realized it's the **exact same bug** as photos
3. Also discovered **albums in db.json had `userId: null`** → filtered query couldn't match any albums

### Fix Applied
```typescript
// RIGHT - Passing only the ID
useFetchAlbumsQuery(user.id)  // user.id = "d566" (string, stable)
```

**Files Changed:**
- `albumsApi.ts`: Changed `fetchAlbums` to accept `userId: string` instead of `user: USER`
- `AlbumList.tsx`: Changed `useFetchAlbumsQuery(user)` → `useFetchAlbumsQuery(user.id)`
- Added RTK Query caching options

---

## Issue #3: Delete Functionality Not Working

### The Problem
Click delete album → button shows loading → nothing happens. Album stays visible.

### Why It Failed
```typescript
// albumsApi.ts
invalidatesTags: (_data, _error, album) => {
  return [{ type: 'Album', id: album.userId }];  // ← album.userId is NULL!
}
```

Even if delete request succeeded, cache invalidation couldn't find the tag because `album.userId` was null.

### My Approach
1. Realized delete mutation needed to pass **user context** for proper tag invalidation
2. Changed delete signature to accept both album AND user

### Fix Applied
```typescript
// OLD (broken)
removeAlbum(album)  // album.userId is null → tag invalidation fails

// NEW (fixed)
removeAlbum({ album, user })  // Now can invalidate [{ type: 'Album', id: user.id }]
```

**Files Changed:**
- `albumsApi.ts`: Changed `removeAlbum` mutation to accept `{ album: AlbumData, user: USER }`
- `AlbumItem.tsx`: Added `user` prop, pass to delete handler
- `AlbumList.tsx`: Pass `user` to each AlbumItem
- `useAlbum.ts`: Updated `handleRemoveAlbum(album, user)` signature

---

## Issue #4: White Screen (Import Errors)

### The Problem
After fixing delete, got **white screen** with no error logs visible to user.

### Root Cause
Accidentally removed imports when editing `AlbumItem.tsx`:
```typescript
// Missing imports!
const { handleRemoveAlbum, reslutsAlbum } = useAlbum();  // useAlbum not imported
return <Photos album={album} />;  // Photos not imported
```

### Fix Applied
Added back missing imports:
```typescript
import useAlbum from './useAlbum';
import Photos from '../Photos/Photos';
```

---

## Why db.json Clearing Solved Everything

### The Real Issue
Even after all code fixes, you still had the original problem. Why?

**Answer: The data was corrupt.**

```json
// db.json (BEFORE clearing)
{
  "albums": [
    { "id": "aede", "userId": null, "title": "Licensed Plastic Chips" }
  ]
}
```

All albums had `userId: null`. The API queries filtered by:
```
GET /albums?userId=5605
```

But the server stored albums with `userId: null` → filter found nothing → both users got empty/same results.

### Why Clearing Helped
When you cleared `db.json`, the backend resets and the **`addAlbum` mutation works correctly** going forward:
```typescript
// POST /albums with body:
{
  userId: "5605",  // ✓ Properly set from current user
  title: "New Album"
}
```

New albums are created with correct `userId`, so filtering works perfectly.

### The Lesson
**Code fix + Bad Data = Still Broken**
- ✓ Code fixes were correct
- ✗ But existing data in db.json was already corrupted
- Solution: Clear corrupted data

---

## Summary Table

| Issue | Root Cause | Where Found | Fix |
|-------|-----------|-------------|-----|
| Photos show for all albums | Passing `album` object instead of `album.id` | RTK Query caching behavior + code review | Use `album.id` string |
| Albums same for all users | Passing `user` object instead of `user.id` | Same pattern recognition + db.json inspection | Use `user.id` string |
| Delete not working | `album.userId` is null; can't invalidate cache | Tag invalidation logic review | Pass user context to mutation |
| White screen | Missing imports | Compile error check | Re-add imports |
| Still broken after fixes | Corrupted db.json (all `userId: null`) | Testing with fresh data | Clear db.json or manually fix |

---

## Key Learnings

### 1. RTK Query Caching Requires Serializable Keys
- ❌ Pass objects → new reference every render → cache miss
- ✅ Pass primitive values (strings, numbers) → stable cache keys

### 2. One Pattern, Two Places
- The photos + albums bug was identical
- Once found in photos, immediately recognized in albums
- **Pattern matching saved debugging time**

### 3. Data Integrity Matters as Much as Code
- Correct code + corrupted data = still broken
- When things don't work after fixes, check your test data
- Use **db.seed.json** or reset data regularly

### 4. Tag Invalidation Needs All Context
- Delete mutation needed user ID for proper cache refresh
- Can't rely on the entity being deleted if its properties are null
- Pass necessary context through mutation arguments

---

## Prevention Tips for Future

```typescript
// ✅ DO
useFetchPhotosQuery(album.id, {
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
})

// ✅ DO
invalidatesTags: (_data, _error, userId) => {
  return [{ type: 'Album', id: userId }];  // Use provided user ID
}

// ❌ DON'T
useFetchPhotosQuery(album)  // Pass whole object

// ❌ DON'T
invalidatesTags: (_data, _error, album) => {
  return [{ type: 'Album', id: album.userId }];  // Relies on album.userId
}
```
