# Roman Project Manager

Full Stack Project Management application built with **Next.js**, **Express**, **MongoDB**, **TypeScript** and **pnpm Workspace**.

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- HttpOnly Cookies

---

# Architecture

```
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
MongoDB
```

- Controller — receives HTTP requests and returns responses.
- Service — contains business logic.
- Repository — works only with the database.
- MongoDB — stores data.

---

# Folder Structure

```
apps
│
├── client
│
└── server
    └── src
        ├── config
        ├── features
        │
        └── auth
            ├── controllers
            ├── dto
            ├── middleware
            ├── models
            ├── repository
            ├── routes
            ├── services
            ├── types
            └── utils
        │
        ├── middlewares
        ├── utils
        ├── app.ts
        └── server.ts
```

---

# Backend Features

## Security

- Helmet
- CORS
- Express Rate Limit
- Morgan Logging
- Global Error Middleware

---

## Validation

- DTO
- Zod Environment Validation
- ObjectId Validation

---

## Authentication

Implemented:

- User Registration
- User Login
- JWT Access Token
- JWT Refresh Token
- HttpOnly Cookies
- Auth Middleware
- Protected Routes
- Logout
- Current User Endpoint

---

# JWT Authentication Flow

```
Register
      │
      ▼
MongoDB
      │
      ▼
Login
      │
      ▼
Access Token
Refresh Token
      │
      ▼
Protected Route
      │
      ▼
JWT Verify
      │
      ▼
Authorized User
```

---

# Authentication Endpoints

## Register

```
POST /api/auth/register
```

Creates a new user.

---

## Login

```
POST /api/auth/login
```

Returns:

- User
- Access Token

Stores:

- Refresh Token inside HttpOnly Cookie

---

## Refresh Token

```
POST /api/auth/refresh
```

Reads Refresh Token from HttpOnly Cookie and generates a new Access Token.

---

## Logout

```
POST /api/auth/logout
```

Clears Refresh Token Cookie.

---

## Current User

```
GET /api/auth/me
```

Returns currently authenticated user.

Requires:

```
Authorization: Bearer ACCESS_TOKEN
```

---

# Authentication Flow

```
Client

      │

Login

      │

Controller

      │

Service

      │

Repository

      │

MongoDB

      │

Generate Tokens

      │

Access Token

+

Refresh Token

      │

Refresh Token

↓

HttpOnly Cookie

      │

Access Token

↓

Client

      │

Protected Route

↓

Auth Middleware

↓

jwt.verify()

↓

Authorized
```

---

# HTTP Security

Implemented:

- Helmet
- CORS
- HttpOnly Cookies
- SameSite Cookies
- JWT Authentication

---

# Environment Variables

```
PORT=5000

MONGODB_URI=

JWT_SECRET=

JWT_REFRESH_SECRET=

CLIENT_URL=http://localhost:3000
```

---

# Current Authentication Features

✅ Register

✅ Login

✅ Access Token

✅ Refresh Token

✅ HttpOnly Cookies

✅ Cookie Parser

✅ JWT Verify

✅ Protected Routes

✅ Logout

✅ Current User Endpoint

---

# Implemented Lessons

## Block 1. Backend Foundation

- Monorepo (pnpm Workspace)
- Next.js + Express + MongoDB
- Feature-based Architecture
- DTO
- Types
- Service Layer
- Repository Pattern
- Environment Variables
- Helmet
- CORS
- Express Rate Limit
- Morgan Logging
- Global Error Middleware
- ObjectId Validation
- Health Check Endpoint

---

## Block 2. Authentication

- User Model (Mongoose)
- Register Endpoint
- Login Endpoint
- JWT Authentication
- Refresh Token
- HttpOnly Cookies
- Auth Middleware
- Protected Routes
- Logout
- Current User Endpoint

---

# Next Block

Email Authentication

- Nodemailer
- Email Verification
- Verify Account
- Forgot Password
- Reset Password
- Change Password
