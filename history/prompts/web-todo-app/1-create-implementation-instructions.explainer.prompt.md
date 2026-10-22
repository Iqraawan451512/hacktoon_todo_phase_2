---
id: 1
title: create-implementation-instructions
stage: explainer
date: 2026-01-13
surface: agent
model: claude-sonnet-4.5
feature: web-todo-app
branch: 01-web-todo-app
user: user
command: sp.implement
labels: [implementation, instructions, backend, frontend, authentication]
links:
  spec: ../specs/01-web-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/01-web-todo-app/implement.md
tests:
---
## Prompt

```text
You are a senior full-stack engineer using Spec-Kit Plus.

Create a file named `sp.implement.md` for a Phase II Full-Stack Todo Web Application.

Project Context:
- This project follows Spec-Driven Development (SDD)
- All specifications and tasks are the single source of truth
- Claude Code is responsible for implementing tasks
- No manual coding by the user is allowed

Reference Documents:
- @specs/sp.constitution.md
- @specs/sp.specification.md
- @specs/sp.plan.md
- @specs/sp.tasks.md

Tech Stack:
- Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (JWT-based)
- Architecture: Monorepo (frontend + backend)

The implementation instructions must define:

1. Step-by-step instructions to implement **all tasks** in `sp.tasks.md`
2. Clear separation between **backend** and **frontend** tasks
3. Implementation order respecting dependencies
4. Authentication setup and JWT integration steps
5. Database setup, migration, and schema alignment
6. API route creation and testing instructions
7. Frontend integration and API consumption steps
8. Validation, testing, and verification instructions
9. Instructions for marking each task as complete
10. Reinforce Phase II boundaries (no out-of-scope implementation)

Constraints:
- Write in structured markdown
- Use numbered steps and bullet points
- Do NOT include actual code
- Instructions must be **actionable and precise**
- Avoid ambiguity
- Assume this file will be reviewed to judge ability to orchestrate full-stack implementation via Claude

Output only the content of `sp.implement.md`.
```

## Response snapshot

Created comprehensive implementation instructions for the Phase II Full-Stack Todo Web Application. The implement.md file includes:

1. Detailed step-by-step instructions for all 82 tasks organized by the 10 phases:
   - Phase 1: Setup (4 tasks)
   - Phase 2: Foundational (8 tasks)
   - Phase 3: User Story 1 - User Registration and Login (9 tasks)
   - Phase 4: User Story 2 - Task Management (9 tasks)
   - Phase 5: User Story 3 - Secure Task Isolation (6 tasks)
   - Phase 6: Frontend Foundation (7 tasks)
   - Phase 7: API Enhancement (6 tasks)
   - Phase 8: Security and Validation (8 tasks)
   - Phase 9: Integration and Testing (7 tasks)
   - Phase 10: Polish and Cross-Cutting Concerns (7 tasks)

2. Clear separation between backend and frontend tasks with specific file paths for each implementation step

3. Implementation order that respects dependencies, with sequential and parallel execution guidance

4. Comprehensive authentication setup and JWT integration steps aligned with Better Auth requirements

5. Database setup, migration, and schema alignment instructions using SQLModel and Neon PostgreSQL

6. API route creation and testing instructions following the contract design from the plan

7. Frontend integration and API consumption steps with proper file structure

8. Validation, testing, and verification instructions for each phase and task

9. Instructions for marking tasks as complete with verification steps

10. Clear Phase II boundary enforcement distinguishing in-scope vs out-of-scope features

The implementation instructions follow the constitutional requirements for monorepo structure, Neon PostgreSQL, SQLModel, JWT authentication, and user isolation. All tasks align with the specifications and plan while maintaining proper separation between backend and frontend responsibilities.

## Outcome

- ✅ Impact: Created detailed implementation roadmap with 82 specific task instructions
- 🧪 Tests: No automated tests for instruction creation
- 📁 Files: Created specs/01-web-todo-app/implement.md
- 🔁 Next prompts: Ready to begin implementation following the detailed instructions
- 🧠 Reflection: The instructions provide clear, actionable steps for completing all required functionality

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard implementation instructions
- Next experiment (smallest change to try): Begin executing the implementation steps