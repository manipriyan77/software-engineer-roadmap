# 1️⃣ Authentication vs Authorization

These two terms are often confused but are very different concepts.

## Authentication

**Definition:** The process of verifying who a user is.

**Purpose:** Ensures that the user is legitimate.

**Frontend Example:**

1. User enters email and password on a login form.
2. The frontend sends these credentials to the backend.
3. Backend verifies credentials and returns a JWT (token).
4. Frontend stores the token (e.g., in memory, `sessionStorage`, or secure cookies) and uses it for subsequent requests.

**Key Points:**

- "Authentication is about identity."
- Usually results in a token/session to prove identity.

## Authorization

**Definition:** The process of checking what a user can do.

**Purpose:** Ensures that the user has permission to access a resource or perform an action.

**Frontend Example:**

After login, a user tries to visit `/admin`.

```javascript
if (user.role === "admin") {
  showAdminPanel();
} else {
  showAccessDenied();
}
```
