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
- Cloudinary
- Nodemailer
- Zod

---

# Architecture

```text
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

# Feature Architecture

Each feature contains:

```text
feature
│
├── controllers
├── dto
├── models
├── repository
├── routes
├── services
└── types
```

Example:

```text
project
│
├── controllers
├── dto
├── models
├── repository
├── routes
├── services
└── types
```

---

# Folder Structure

```text
apps
│
├── client
│
└── server
    │
    └── src
        │
        ├── config
        │
        ├── features
        │   │
        │   ├── auth
        │   ├── user
        │   ├── workspace
        │   ├── workspace-members
        │   ├── project
        │   └── task
        │
        ├── middlewares
        ├── utils
        │
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
- HttpOnly Cookies
- JWT Authentication

---

## Validation

- DTO
- Zod Validation
- Environment Validation
- ObjectId Validation

---

# Authentication

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

# Email Authentication

Implemented:

- Nodemailer
- Email Verification
- Verify Account
- Forgot Password
- Reset Password
- Change Password

---

# User Profile

Implemented:

- Edit Profile
- Cloudinary Avatar Upload
- User Settings
- Account Preferences

---

# Workspace

Implemented:

- Workspace Model
- Workspace CRUD
- Invite Users
- Join Workspace
- Roles
- Permission Matrix
- Workspace Settings

---

# Projects

Implemented:

- Project Model
- Project CRUD
- Search
- Pagination
- Filters
- Sorting
- Project Members

Features:

- Search by project name
- Pagination
- Status filtering
- Sorting
- Member management

---

# Tasks

Implemented:

- Task Model
- Create Task
- Edit Task
- Delete Task
- Labels
- Priority
- Due Date
- Checklist
- Attachments (Cloudinary)

Features:

- Task status
- Task priorities
- Labels
- Due dates
- Checklists
- File attachments

---

# JWT Authentication Flow

```text
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

```http
POST /api/auth/register
```

Creates a new user.

---

## Login

```http
POST /api/auth/login
```

Returns:

- User
- Access Token

Stores:

- Refresh Token inside HttpOnly Cookie

---

## Refresh Token

```http
POST /api/auth/refresh
```

Reads Refresh Token from HttpOnly Cookie and generates a new Access Token.

---

## Logout

```http
POST /api/auth/logout
```

Clears Refresh Token Cookie.

---

## Current User

```http
GET /api/auth/me
```

Requires:

```text
Authorization: Bearer ACCESS_TOKEN
```

Returns currently authenticated user.

---

# Project Endpoints

## Create Project

```http
POST /api/projects
```

---

## Get Projects

```http
GET /api/projects
```

---

## Search Projects

```http
GET /api/projects/search?search=roman
```

---

## Filter Projects

```http
GET /api/projects/filter?status=active
```

---

## Get Project By Id

```http
GET /api/projects/:id
```

---

## Update Project

```http
PATCH /api/projects/:id
```

---

## Delete Project

```http
DELETE /api/projects/:id
```

---

# Task Endpoints

## Create Task

```http
POST /api/tasks
```

---

## Update Task

```http
PATCH /api/tasks/:id
```

---

## Delete Task

```http
DELETE /api/tasks/:id
```

---

# Authentication Flow

```text
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

Authorized User
```

---

# HTTP Security

Implemented:

- Helmet
- CORS
- Express Rate Limit
- JWT Authentication
- HttpOnly Cookies
- SameSite Cookies

---

# Environment Variables

```env
PORT=5000

CLIENT_URL=http://localhost:3000

MONGODB_URI=

JWT_SECRET=

JWT_REFRESH_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

SMTP_HOST=

SMTP_PORT=

SMTP_USER=

SMTP_PASSWORD=
```

---

# Current Project Status

Completed Lessons: 58 / 90

Progress: 64%

---

# Implemented Lessons

## Block 1. Backend Architecture & Foundation

- Monorepo (pnpm Workspace)
- Next.js + Express + MongoDB
- Feature-based Architecture
- DTO + Types
- Service Layer
- Repository Pattern
- Environment Variables + Zod Validation
- Helmet
- CORS
- Express Rate Limit
- Morgan Logging
- Global Error Middleware
- ObjectId Validation
- Health Check Endpoint

---

## Block 2. Authentication

- User Model
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

## Block 3. Email Authentication

- Nodemailer
- Email Verification
- Verify Account
- Forgot Password
- Reset Password
- Change Password

---

## Block 4. User Profile

- User Model Refactoring
- Edit Profile
- Cloudinary Avatar
- User Settings
- Account Preferences

---

## Block 5. Workspace

- Workspace Model
- Workspace CRUD
- Invite Users
- Join Workspace
- Roles
- Permission Matrix
- Workspace Settings

---

## Block 6. Projects

- Project Model
- Project CRUD
- Search
- Pagination
- Filters
- Sorting
- Project Members

---

## Block 7. Tasks

- Task Model
- Create Task
- Edit Task
- Delete Task
- Labels
- Priority
- Due Date
- Checklist
- Attachments (Cloudinary)

---

# Next Block

## Block 8. Comments

59. Comments CRUD

60. Mentions

61. Activity Log

---

# Roadmap

Remaining Lessons:

- Comments
- Realtime
- Notifications
- File Management
- Search & Analytics
- Testing
- Deployment
- CI/CD

---

# Goal

Build a production-ready Project Management platform inspired by:

- Jira
- Trello
- ClickUp
- Asana

using modern Full Stack architecture, scalable backend design, clean code principles and TypeScript.
