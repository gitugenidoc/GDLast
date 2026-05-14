# Phase 1: Authentication & RBAC - Implementation Guide

## Overview

Phase 1 implements complete authentication and role-based access control (RBAC) for GeniDoc Hayat. This is a production-ready implementation with JWT tokens, password security, and proper role enforcement.

## What Was Implemented

### Backend (Node.js + Express)

#### 1. **JWT Token Management** (`backend/src/utils/jwt.js`)

- `generateAccessToken()` - Creates short-lived access tokens (24h default)
- `generateRefreshToken()` - Creates long-lived refresh tokens (7d default)
- `verifyAccessToken()` - Validates access tokens
- `verifyRefreshToken()` - Validates refresh tokens
- `decodeToken()` - Decodes token payloads

**Configuration:**

```env
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
```

#### 2. **Password Security** (`backend/src/utils/password.js`)

- `hashPassword()` - Bcryptjs password hashing (10 rounds)
- `comparePassword()` - Secure password comparison
- `isPasswordStrong()` - Password strength validation

**Requirements:**

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (@$!%\*?&)

#### 3. **Validation Schemas** (`backend/src/validators/auth.schema.js`)

- `registerSchema` - Validates registration data with password confirmation
- `loginSchema` - Validates login credentials
- `refreshTokenSchema` - Validates refresh token requests

#### 4. **Authentication Service** (`backend/src/services/auth.service.js`)

- `register()` - Creates new user with role-specific profile
- `login()` - Authenticates user and generates tokens
- `refreshToken()` - Issues new access token from refresh token
- `getCurrentUser()` - Retrieves user by ID
- `logout()` - Logs audit entry for logout

**Features:**

- Duplicate email detection
- User status validation (must be ACTIVE)
- Automatic profile creation (ParentProfile or PediatricianProfile)
- Audit logging on all actions
- Formatted user response (excludes password)

#### 5. **Auth Middleware** (`backend/src/middleware/auth.js`)

- `authenticate()` - Verifies JWT tokens from Authorization header
- `authorize()` - Checks user role against allowed roles

**Usage:**

```javascript
router.get(
  "/protected",
  authenticate,
  authorize("PARENT", "PEDIATRICIAN"),
  handler,
);
```

#### 6. **API Routes** (`backend/src/routes/auth.routes.js`)

| Endpoint             | Method | Auth     | Purpose                  |
| -------------------- | ------ | -------- | ------------------------ |
| `/api/auth/register` | POST   | None     | Register new user        |
| `/api/auth/login`    | POST   | None     | Authenticate user        |
| `/api/auth/refresh`  | POST   | None     | Refresh access token     |
| `/api/auth/me`       | GET    | Required | Get current user profile |
| `/api/auth/logout`   | POST   | Required | Logout and audit         |

**Request/Response Examples:**

**Register:**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "parent@example.com",
  "password": "SecurePass123!",
  "passwordConfirm": "SecurePass123!",
  "firstName": "Ahmed",
  "lastName": "Hassan",
  "phone": "+212612345678",
  "role": "PARENT"
}

Response 201:
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid...",
      "email": "parent@example.com",
      "firstName": "Ahmed",
      "lastName": "Hassan",
      "role": "PARENT",
      "status": "ACTIVE"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Login:**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "parent@example.com",
  "password": "SecurePass123!"
}

Response 200: (same as register)
```

**Refresh Token:**

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}

Response 200: (returns new tokens)
```

**Get Me:**

```bash
GET /api/auth/me
Authorization: Bearer eyJhbGc...

Response 200:
{
  "status": "success",
  "data": {
    "id": "uuid...",
    "email": "parent@example.com",
    "firstName": "Ahmed",
    ...
  }
}
```

#### 7. **Audit Logging**

All authentication events are logged to `AuditLog`:

- USER_REGISTERED
- USER_LOGIN
- USER_LOGOUT

### Frontend (React + Vite)

#### 1. **Auth Context** (`frontend/src/features/auth/context/AuthContext.jsx`)

- Manages global authentication state
- Handles token storage in localStorage
- Implements login/register/logout flows
- Handles token refresh automatically
- Exposes `isAuthenticated` flag

**Context Methods:**

```javascript
{
  user: { /* current user */ },
  loading: boolean,
  error: string,
  login: async (email, password) => user,
  register: async (userData) => user,
  logout: async () => void,
  refreshAccessToken: async () => token,
  isAuthenticated: boolean
}
```

#### 2. **useAuth Hook** (`frontend/src/features/auth/hooks/useAuth.js`)

```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

#### 3. **Protected Route Component** (`frontend/src/features/auth/components/ProtectedRoute.jsx`)

- Redirects unauthenticated users to login
- Shows loading spinner during auth check
- Can be wrapped around any page

```jsx
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

#### 4. **Role Guard Component** (`frontend/src/features/auth/components/RoleGuard.jsx`)

- Checks user role against allowed roles
- Redirects to /unauthorized for insufficient permissions

```jsx
<RoleGuard allowedRoles={["PARENT", "PEDIATRICIAN"]}>
  <ProtectedPage />
</RoleGuard>
```

#### 5. **Login Page** (`frontend/src/pages/auth/LoginPage.jsx`)

- Email and password form
- Form validation and error display
- Calls backend `/api/auth/login`
- Stores tokens and redirects to dashboard
- Handles loading states

#### 6. **Register Page** (`frontend/src/pages/auth/RegisterPage.jsx`)

- Full registration form
- Password confirmation
- Role selection (PARENT or PEDIATRICIAN)
- Password strength requirements display
- Calls backend `/api/auth/register`

#### 7. **Dashboard** (`frontend/src/pages/dashboard/DashboardPage.jsx`)

- Protected route showing user info
- Displays user role, email, status
- Logout button
- Welcome message with first name
- Phase 1 feature checklist

#### 8. **Updated Router** (`frontend/src/app/router.jsx`)

- `/` - Home page
- `/auth/login` - Login form
- `/auth/register` - Registration form
- `/dashboard` - Protected dashboard
- `/unauthorized` - Access denied page
- `*` - 404 page

#### 9. **Updated App** (`frontend/src/app/App.jsx`)

- Wrapped with `<AuthProvider>`
- All child routes have access to auth context

## Database Schema Impact

The following models are used for authentication:

### User Model

```prisma
model User {
  id                        String                 @id @default(cuid())
  email                     String                 @unique
  password                  String                 // Hashed with bcryptjs
  firstName                 String
  lastName                  String
  phone                     String?
  role                      UserRole               // PARENT, PEDIATRICIAN, FACILITY_ADMIN, etc.
  status                    UserStatus             // ACTIVE, INACTIVE, SUSPENDED
  parentProfile             ParentProfile?
  pediatricianProfile       PediatricianProfile?
  createdAt                 DateTime               @default(now())
  updatedAt                 DateTime               @updatedAt
}

enum UserRole {
  PARENT
  PEDIATRICIAN
  CLINIC_ADMIN
  HOSPITAL_ADMIN
  FACILITY_ADMIN
  SUPER_ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}
```

### ParentProfile & PediatricianProfile

Automatically created on user registration based on role.

### AuditLog Model

Tracks all authentication events for compliance.

## Testing

### 1. **Register a New User**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newparent@test.com",
    "password": "SecurePass123!",
    "passwordConfirm": "SecurePass123!",
    "firstName": "Fatima",
    "lastName": "Benali",
    "phone": "+212612345678",
    "role": "PARENT"
  }'
```

### 2. **Login**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newparent@test.com",
    "password": "SecurePass123!"
  }'
```

Save the `accessToken` from response for next requests.

### 3. **Access Protected Route**

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. **Refresh Token**

```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### 5. **Frontend Testing**

1. Start backend: `npm run dev` in `/backend`
2. Start frontend: `npm run dev` in `/frontend`
3. Go to http://localhost:5173
4. Click "Register" or go to `/auth/register`
5. Fill in registration form
6. Submit and see redirect to dashboard
7. Click "Logout" and verify redirect to login

## Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/genidoc"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32"
JWT_EXPIRE="24h"
JWT_REFRESH_EXPIRE="7d"
PORT=3000
NODE_ENV=development
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:3000
```

## Security Considerations

✅ **Implemented:**

- Passwords hashed with bcryptjs (10 rounds)
- JWT tokens with expiration
- Separate access/refresh token strategy
- Token stored in localStorage
- CORS enabled
- Rate limiting middleware
- Helmet security headers
- User status validation
- Audit logging

⚠️ **Production Recommendations:**

- Use `httpOnly` cookies instead of localStorage for tokens
- Implement CSRF protection
- Add rate limiting for auth endpoints
- Use HTTPS only
- Implement email verification
- Add account lockout on failed attempts
- Implement 2FA for sensitive accounts
- Monitor audit logs for suspicious activity

## Next Steps (Phase 2)

1. **Newborn Management** - Create, list, update newborn profiles
2. **Medical Records** - Add vaccination, growth, consultation records
3. **Access Permissions** - Allow parents to share newborn access with doctors
4. **Smart Cards** - QR/NFC integration for smart card generation
5. **Facility Management** - Manage clinics and hospitals

## File Structure

```
genidochayatthelast/
├── backend/
│   └── src/
│       ├── utils/
│       │   ├── jwt.js                   ✅ NEW
│       │   └── password.js              ✅ NEW
│       ├── validators/
│       │   └── auth.schema.js           ✅ NEW
│       ├── services/
│       │   └── auth.service.js          ✅ NEW
│       ├── controllers/
│       │   └── auth.controller.js       ✅ NEW
│       ├── middleware/
│       │   └── auth.js                  ✅ NEW
│       └── routes/
│           ├── auth.routes.js           ✅ NEW
│           └── index.js                 ✅ UPDATED
├── frontend/
│   └── src/
│       ├── features/
│       │   └── auth/
│       │       ├── context/
│       │       │   └── AuthContext.jsx   ✅ NEW
│       │       ├── hooks/
│       │       │   └── useAuth.js        ✅ NEW
│       │       └── components/
│       │           ├── ProtectedRoute.jsx ✅ NEW
│       │           └── RoleGuard.jsx      ✅ NEW
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── LoginPage.jsx        ✅ UPDATED
│       │   │   └── RegisterPage.jsx     ✅ NEW
│       │   └── dashboard/
│       │       └── DashboardPage.jsx    ✅ NEW
│       └── app/
│           ├── router.jsx               ✅ UPDATED
│           └── App.jsx                  ✅ UPDATED
└── PHASE-1-IMPLEMENTATION-GUIDE.md      ✅ THIS FILE
```

## Status: ✅ COMPLETE

All Phase 1 features implemented and tested:

- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Token refresh mechanism
- ✅ Protected routes
- ✅ RBAC implementation
- ✅ Persistent authentication
- ✅ Audit logging
- ✅ Frontend auth UI
- ✅ Error handling
- ✅ Loading states

**Ready for Phase 2: Newborn Management**
