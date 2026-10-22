---
id: 1
title: update-project-constitution
stage: constitution
date: 2026-01-13
surface: agent
model: claude-sonnet-4.5
feature: none
branch: master
user: user
command: sp.constitution
labels: [constitution, setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
---
## Prompt

```text
# sp.constitution.md

## 1. Purpose
This System Constitution defines the non-negotiable rules governing the design, development, and evolution of the Phase II Full-Stack Todo Web Application.
It ensures disciplined Spec-Driven Development (SDD) and constrains Claude Code to operate within clearly defined architectural, security, and quality boundaries.

---

## 2. Non-Negotiable Architectural Rules
- The project **must use a monorepo** with clear separation of `frontend/` and `backend/`.
- Frontend and backend **must not share runtime code** or state.
- All persistent data **must be stored in Neon Serverless PostgreSQL**.
- All backend data access **must go through SQLModel**.
- No architectural shortcuts or alternative stacks are permitted.

---

## 3. Spec-First Development Rules
- Specifications are the **single source of truth**.
- No implementation may be created or modified **without an explicit spec**.
- If requirements change, **specs must be updated first**, then implementation aligned.
- Claude Code must always reference relevant specs using `@specs/...`.

---

## 4. Security & Authentication Principles
- Authentication is handled via **Better Auth issuing JWT tokens**.
- Every API request **must require a valid JWT**.
- Backend **must verify JWT signature and expiry** using a shared secret.
- User identity **must be derived from the JWT**, not from client input.
- **Strict user isolation** is mandatory: users may only access their own tasks.

---

## 5. API Design Constraints
- APIs must be **RESTful**, stateless, and JSON-based.
- All endpoints must be **secured by JWT authentication**.
- All task operations must be **scoped to the authenticated user**.
- Unauthorized requests must return **401 Unauthorized**.
- Ownership checks are required for all read/write operations.

---

## 6. Frontend–Backend Separation Rules
- Frontend (Next.js) handles:
  - UI rendering
  - User interaction
  - Authentication flow with Better Auth
- Backend (FastAPI) handles:
  - Business logic
  - Data persistence
  - Authorization and ownership enforcement
- Frontend must never bypass backend security logic.

---

## 7. Claude Code Behavioral Rules
Claude Code **must**:
- Follow all relevant specs and this constitution strictly
- Generate plans and tasks before implementation
- Implement features incrementally and transparently

Claude Code **must not**:
- Add features not defined in specs
- Modify behavior without spec changes
- Collapse multiple concerns into a single step
- Assume intent beyond what is explicitly specified

---

## 8. Change Management Rules
- All changes begin with a **spec update**.
- Spec changes must be **explicit and reviewable**.
- Code must be regenerated or updated **only after spec approval**.
- Historical consistency between specs and implementation must be preserved.

---

## 9. Quality Standards
- Emphasize **clarity over cleverness**.
- Code must be:
  - Readable
  - Maintainable
  - Minimal
- Avoid over-engineering and unnecessary abstractions.
- Follow idiomatic patterns for each technology used.

---

## 10. Phase Awareness (Phase II Only)
- Scope is strictly limited to **Phase II: Web Application**.
- Required features:
  - Task CRUD
  - Authentication
  - Secure REST API
  - Persistent storage
- Chatbot, voice commands, and multi-language support are **out of scope** unless explicitly specified for bonus extensions.

---

**This constitution is binding for all Claude Code actions within Phase II.**
```

## Response snapshot

Updated the project constitution at .specify/memory/constitution.md with the provided content, replacing the template placeholders with concrete values. The constitution now contains 10 principles/rules that govern the Phase II Full-Stack Todo Web Application development. The updated constitution enforces architectural rules, spec-first development, security principles, API constraints, frontend-backend separation, Claude Code behavioral rules, change management, quality standards, and phase awareness. A sync impact report was included in the file header showing that no template updates were required.

## Outcome

- ✅ Impact: Updated project constitution file with concrete principles
- 🧪 Tests: No tests required for this change
- 📁 Files: Modified .specify/memory/constitution.md
- 🔁 Next prompts: Ready to proceed with feature development using the new constitution
- 🧠 Reflection: The constitution provides clear guidelines for development that will help ensure consistent and secure implementation of the todo application

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard constitution update
- Next experiment (smallest change to try): Begin feature development following the new constitution