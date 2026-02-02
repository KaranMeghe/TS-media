<!-- @format -->

# Users Feature (Redux Thunks)

This feature manages **users data** using **Redux Toolkit with async thunks**

---

## Goal

- Fetch users from an external API (JSON SERVER)
- Display users in the ui
- Create new users
- Delete existing users
- Handle loading and error states correctly

This feature is implemented usring **RTK THUNKS**

---

## State shape

The users slice manages following state:

- `users[{},{}]`: list of users,
- `isUserFetching`: loading state for fetching users,
- `isUserCreating`: loading state for creating users,
- `isDeleteUser`: loading state for deleting users,
- `fetchError`: error while fetching users,
- createUserError: error while creating users,
- deleteUserError: error while deleting users,

Each loading state have its own **loading and error** state to avoid UI fliker

---

## Async Thunks

### fetchUsers

- Triggered when the Users screen loads
- Fetch users from API
- Controls the main list loading skeleton

### addNewUser

- Triggered when user click on "+ User" button
- Create new user using using a POST method
- Show a button-level loader

### deleteUser

- Triggered when user click on "Delete" button
- Delete user from the API
- Update Redux state optimistically

---

## Design Decisions

### Why Redux thunks ?

- Since we are already using RTK so Thunks or RTK Query for handling network requests inside Redux store
- Explicit control over loading and error states
- Clear understanging of async lifecycle (pending,fulfilled,rejected)

---

### Why sepration of loading states?

Using sing `isLoading` flag caused UI flashing,
Each aync operation now owns its own loading state:

- Fecthing users - list skelleton
- Creating user - button spinner

This prevents unnecessary re-renders and improve UX.

---

## Data Flow

1 Ui Dispatches a thunk function
2 Thunk function performs API request
3 Redux updates state via extraReducers
4 UI reacts to update state via selectors

UI components never call API directly.

---

### Notes

- All async logic is handled inside thunks
- UI components remain declarati ve
- This feature can later be migrated to RTK Query
