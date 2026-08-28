# Roman Project Manager

Full Stack Project Management Platform inspired by **Jira, Trello, ClickUp and Asana**.

The project is being developed as a production-oriented Full Stack application with a focus on scalable backend architecture, authentication, authorization, workspace management, projects, tasks, realtime communication and production-ready API design.

---

## 🚀 Project Status

**83 / 240 lessons completed**

The project is actively developed as part of a structured Full Stack learning program.

Current focus:

* Full Stack architecture
* REST API development
* Authentication & authorization
* MongoDB data modeling
* Workspace and project management
* Task management
* Realtime communication
* Production backend architecture
* Modern React / Next.js development
* TypeScript

---

# 🛠 Tech Stack

## Frontend

* **Next.js 16**
* **React 19**
* **TypeScript**
* **dnd-kit**
* Modern React Hooks
* Client / Server Components
* API integration

## Backend

* **Node.js**
* **Express**
* **TypeScript**
* **MongoDB**
* **Mongoose**
* **Socket.io**
* **JWT**
* **Swagger**
* **Zod**

## Infrastructure & Services

* **pnpm Workspace**
* **Cloudinary**
* **Nodemailer**
* REST API
* Environment-based configuration

---

# 🏗 Architecture

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
MongoDB
```

This separation allows the application to remain:

* scalable
* maintainable
* testable
* easier to extend
* easier to refactor

The project is organized as a **monorepo using pnpm Workspace**.

---

# 📦 Project Structure

```text
roman-project-manager/
│
├── apps/
│   ├── backend/
│   │   └── src/
│   │
│   └── frontend/
│       └── src/
│
├── packages/
│
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

The exact internal structure continues to evolve as new architectural layers and features are implemented.

---

# 🔐 Authentication

The authentication system is designed around modern security practices.

Implemented concepts include:

* JWT authentication
* Access tokens
* Refresh tokens
* HttpOnly cookies
* Authentication middleware
* Protected routes
* Email verification
* Password recovery
* Password reset
* User authorization

The authentication architecture is separated from business logic to keep the system maintainable.

---

# 👤 User Profile

User management includes:

* User model
* User profile
* Profile data
* Protected profile operations
* Authentication-aware API requests
* User ownership concepts

The user model serves as the foundation for workspaces, projects, tasks and realtime communication.

---

# 🏢 Workspace

The platform supports collaborative workspaces.

Workspace functionality includes:

* Workspace CRUD
* Workspace ownership
* Workspace members
* Roles
* Permissions
* User invitations
* Protected workspace operations

The workspace acts as a high-level container for collaborative project management.

---

# 📁 Projects

Projects are managed inside workspaces.

Implemented functionality includes:

* Project CRUD
* Project ownership
* Workspace-based access
* Search
* Filtering
* Pagination
* Sorting
* Protected project operations

Projects provide the main organizational layer for tasks and team collaboration.

---

# ✅ Tasks

The task management system is one of the core parts of Roman Project Manager.

Tasks support:

* Task CRUD
* Status
* Priority
* Labels
* Due dates
* Checklists
* Attachments
* Project association
* Workspace context
* Ownership and authorization

The frontend includes an interactive Kanban board.

Example workflow:

```text
TODO
  ↓
IN PROGRESS
  ↓
DONE
```

Tasks can be moved between statuses using drag-and-drop interaction.

---

# 💬 Comments

Projects and tasks can be extended with collaborative comments.

The comments system provides the foundation for team communication directly inside project-management workflows.

---

# ⚡ Realtime Communication

Realtime functionality is implemented using **Socket.io**.

Planned / implemented realtime capabilities include:

* Team chat
* Private chat
* Online users
* Typing indicators
* Realtime events
* Socket-based communication

The realtime layer is designed separately from the standard REST API.

---

# 🖼 File Uploads

The application uses **Cloudinary** for media storage.

The system is designed to support:

* Task attachments
* User images
* Uploaded files
* Cloud-based media storage

---

# 📧 Email System

Email functionality is implemented using **Nodemailer**.

It is used for authentication-related workflows such as:

* Email verification
* Password recovery
* Password reset

---

# 🛡 Authorization & Security

Security is a major part of the backend architecture.

The project includes concepts such as:

* JWT authentication
* Refresh tokens
* HttpOnly cookies
* Protected routes
* Ownership protection
* Role-based permissions
* Admin permissions
* Workspace-level access control
* Input validation
* Environment variables

Validation is handled with **Zod** where appropriate.

---

# 📚 API Documentation

The backend API is documented using **Swagger**.

The goal is to provide a clear API contract for:

* Authentication
* Users
* Workspaces
* Projects
* Tasks
* Comments
* Realtime-related endpoints
* Production API structure

API versioning is also part of the backend architecture.

Example:

```text
/api/v1
```

---

# 🔄 API Architecture

The application uses a REST-oriented backend architecture.

Typical request flow:

```text
HTTP Request
     ↓
Route
     ↓
Middleware
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
Mongoose
     ↓
MongoDB
```

This architecture separates responsibilities and makes the backend easier to scale.

---

# 🗄 Database

The project uses:

* **MongoDB**
* **Mongoose**

The database layer contains models and relationships for the main application entities.

Core entities include:

```text
User
Workspace
Project
Task
Comment
```

Additional entities are introduced as the application grows.

---

# 🎯 Main Features

## Authentication

* [x] JWT authentication
* [x] Refresh tokens
* [x] HttpOnly cookies
* [x] Email verification
* [x] Password recovery
* [x] Password reset

## Users

* [x] User model
* [x] User profile
* [x] Protected profile operations

## Workspaces

* [x] Workspace CRUD
* [x] Workspace ownership
* [x] Members
* [x] Roles
* [x] Permissions
* [x] Invitations

## Projects

* [x] Project CRUD
* [x] Search
* [x] Filters
* [x] Pagination
* [x] Sorting
* [x] Ownership protection

## Tasks

* [x] Task CRUD
* [x] Status
* [x] Priority
* [x] Labels
* [x] Due dates
* [x] Checklists
* [x] Attachments
* [x] Kanban board
* [x] Drag & drop

## Comments

* [x] Comment functionality
* [x] Protected operations

## Realtime

* [x] Socket.io integration
* [x] Team communication architecture
* [x] Private chat architecture
* [x] Online users
* [x] Typing indicators

## Production

* [x] Layered backend architecture
* [x] Ownership protection
* [x] Admin permissions
* [x] API versioning
* [x] Swagger documentation
* [x] Environment configuration

---

# 📈 Development Progress

Current progress:

```text
83 / 240 lessons
```

Completed major areas:

```text
Backend Architecture
        ↓
Authentication
        ↓
Email Authentication
        ↓
User Profile
        ↓
Workspace
        ↓
Projects
        ↓
Tasks
        ↓
Comments
        ↓
Realtime
        ↓
Backend Production
        ↓
Frontend Development
        ↓
...
```

The project is continuously evolving as new lessons introduce additional production-level functionality.

---

# 🧠 What This Project Demonstrates

Roman Project Manager is designed to demonstrate practical Full Stack development rather than isolated tutorial examples.

The project covers:

* TypeScript
* React
* Next.js
* Node.js
* Express
* MongoDB
* Mongoose
* REST API
* JWT
* Authentication
* Authorization
* RBAC
* Layered architecture
* Repository pattern
* Service layer
* Controllers
* API validation
* File uploads
* Email systems
* WebSockets
* Realtime applications
* Drag & drop interfaces
* Kanban boards
* Monorepo architecture
* API documentation
* Production backend practices

---

# 🎯 Project Goal

The main goal is to build a **production-ready Full Stack Project Management Platform** while developing practical experience with modern web architecture.

The final application should combine:

```text
Modern Frontend
       +
Scalable Backend
       +
Secure Authentication
       +
Authorization
       +
Database Architecture
       +
Realtime Communication
       +
Production Practices
```

into one complete application.

---

# 🚧 Development

The project is **actively under development**.

New features, architectural improvements and frontend functionality are continuously added as the learning program progresses.

Current progress:

**Lesson 83 / 240**

---

# 👨‍💻 Author

**Roman Okhremov**

Full Stack Developer in training.

Building **Roman Project Manager** from the ground up with modern Full Stack technologies and production-oriented architecture.
