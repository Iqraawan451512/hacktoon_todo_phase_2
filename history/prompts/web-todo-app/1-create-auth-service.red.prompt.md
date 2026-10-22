---
id: 1
title: create-auth-service
stage: red
date: 2026-01-13
surface: agent
model: claude-sonnet-4.5
feature: web-todo-app
branch: 01-web-todo-app
user: user
command: sp.implement
labels: [auth, backend, jwt, security, authentication]
links:
  spec: ../specs/01-web-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/services/auth.py
tests:
---
## Prompt

```text
You are a senior backend architect using Spec-Kit Plus.

Task: T006 - JWT Authentication Service Configuration

Create the file `backend/src/services/auth.py` for the Phase II Full-Stack Todo Web Application.

Project Context:
- Backend: FastAPI with SQLModel
- Authentication: JWT-based using Python-Jose and Passlib
- Spec-Driven Development: No manual coding allowed
- Phase II scope only: authentication service

Requirements:
1. Implement user authentication logic with JWT tokens
2. Include functions for:
   - Generating JWT tokens
   - Verifying JWT tokens
   - Password hashing and verification using Passlib
3. Configure secret keys and expiration using environment variables
4. Ensure integration readiness with AuthVerifier sub-agent
5. Keep authentication service modular and importable by FastAPI routes
6. No UI, database CRUD, or localization code

Verification Checklist:
- File `backend/src/services/auth.py` created
- JWT token generation and verification functions implemented
- Password hashing and verification functions implemented
- Secret keys and expiration configurable via environment variables
- Fully Phase II compliant

Constraints:
- Keep changes Phase II safe
- Follow constitutional requirements (JWT-based Better Auth)
- Maintain clear, readable, maintainable code
- No additional features outside authentication service

Output only the content of `backend/src/services/auth.py` ready for implementation.
```

## Response snapshot

Created the JWT authentication service module for the backend application. The file backend/src/services/auth.py includes:

1. Password hashing context using Passlib with bcrypt scheme
2. JWT token configuration with secret key, algorithm, and expiration settings from environment variables
3. Password verification and hashing functions
4. User authentication function that verifies passwords
5. JWT token creation function with expiration handling
6. Token verification function that decodes and validates JWT tokens
7. Functions to extract user payload and user ID from tokens

The implementation follows constitutional requirements using JWT-based authentication and provides proper security practices. The file contains only authentication service logic without any UI, database CRUD operations, or localization code, maintaining Phase II compliance. The service is modular and ready for integration with the AuthVerifier sub-agent.

## Outcome

- ✅ Impact: Created comprehensive JWT authentication service
- 🧪 Tests: No automated tests for file creation
- 📁 Files: Created backend/src/services/auth.py
- 🔁 Next prompts: Ready to proceed with next backend component
- 🧠 Reflection: The authentication service is properly configured with security best practices

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard auth service setup
- Next experiment (smallest change to try): Continue with backend model creation