# Phase II Todo Web Application - Claude Sub-Agents

This document defines reusable Claude sub-agents for handling recurring tasks and intelligence in the Phase II Full-Stack Todo Web Application.

---

## 1. TaskManager Agent
**Responsibility:**
- Manage task CRUD operations across backend and frontend
- Ensure task ownership and user isolation

**Inputs:**
- Task creation or update requests
- User ID and JWT token

**Outputs:**
- Task objects (created, updated, or deleted)
- Validation status

**Assigned Task Types:**
- Create Task
- Update Task
- Delete Task
- Toggle Task Completion
- Fetch User Tasks

**Dependencies:**
- AuthVerifier Agent (to confirm user identity)
- DatabaseAgent (for persistence operations)

**Integration Rules:**
- Always confirm user JWT before modifying tasks
- Return structured task objects for frontend consumption

---

## 2. AuthVerifier Agent
**Responsibility:**
- Handle JWT validation and user authentication for all API calls

**Inputs:**
- Authorization header from frontend API calls
- User ID from request

**Outputs:**
- Authenticated user object
- Unauthorized status if validation fails

**Assigned Task Types:**
- JWT validation
- User session verification

**Dependencies:**
- None (first agent in call chain)

**Integration Rules:**
- Must be invoked before TaskManager Agent
- Deny access if JWT is invalid or expired

---

## 3. DatabaseAgent
**Responsibility:**
- Handle all database operations using SQLModel
- Maintain data consistency and integrity

**Inputs:**
- SQLModel queries from TaskManager Agent
- Task or user objects

**Outputs:**
- Query results
- Operation success/failure

**Assigned Task Types:**
- Insert, Update, Delete, Fetch tasks
- User data retrieval

**Dependencies:**
- None (backend core agent)

**Integration Rules:**
- Always filter by authenticated user ID
- Log errors without exposing sensitive data

---

## 4. FrontendIntegrator Agent
**Responsibility:**
- Connect backend API responses to frontend components
- Format data for UI display

**Inputs:**
- Task objects from TaskManager Agent
- Authenticated user data

**Outputs:**
- UI-ready task lists
- Notifications for success/error

**Assigned Task Types:**
- Render tasks
- Update UI on task changes
- Display error/success messages

**Dependencies:**
- TaskManager Agent
- AuthVerifier Agent

**Integration Rules:**
- Maintain reactive UI updates
- Respect design and styling conventions (Tailwind CSS)

---

## 5. Validator Agent
**Responsibility:**
- Perform verification and validation of completed tasks
- Ensure security, correctness, and compliance with specs

**Inputs:**
- Task operations performed by TaskManager Agent
- User actions

**Outputs:**
- Validation reports
- Bug identification and spec update suggestions

**Assigned Task Types:**
- Backend API testing
- Frontend integration testing
- Security verification (JWT, user isolation)
- Regression checks

**Dependencies:**
- TaskManager Agent
- DatabaseAgent
- FrontendIntegrator Agent

**Integration Rules:**
- Report issues clearly to iteration workflow
- Suggest spec updates if inconsistencies are found