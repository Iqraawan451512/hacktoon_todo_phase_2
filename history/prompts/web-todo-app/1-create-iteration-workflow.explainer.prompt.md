---
id: 1
title: create-iteration-workflow
stage: explainer
date: 2026-01-13
surface: agent
model: claude-sonnet-4.5
feature: web-todo-app
branch: 01-web-todo-app
user: user
command: sp.iterations
labels: [iterations, testing, validation, qa, security]
links:
  spec: ../specs/01-web-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/01-web-todo-app/iterations.md
tests:
---
## Prompt

```text
You are a senior QA and system refinement architect.

Create a file named `sp.iterations.md` for a Phase II Full-Stack Todo Web Application.

Project Context:
- Follows Spec-Driven Development (SDD)
- Claude Code is responsible for implementation
- No manual coding allowed

Reference Documents:
- @specs/sp.constitution.md
- @specs/sp.specification.md
- @specs/sp.plan.md
- @specs/sp.tasks.md
- @specs/sp.implement.md

The iterations file must define:

1. A sequence of verification and validation steps for completed tasks
2. Backend API testing instructions
3. Frontend integration testing steps
4. Security verification steps (JWT auth, user isolation)
5. Regression checks for task CRUD
6. Bug identification and specification update workflow
7. Iteration cycle for improving or refining features
8. Completion criteria for Phase II
9. Constraints to keep all changes within Phase II scope

Constraints:
- Use clear numbered steps and bullet points
- Do NOT include implementation code
- Write in structured markdown
- Assume this document will be reviewed to judge SDD maturity and quality assurance discipline

Output only the content of `sp.iterations.md`.
```

## Response snapshot

Created comprehensive iteration workflow document for the Phase II Full-Stack Todo Web Application. The iterations.md file includes:

1. A complete verification and validation framework with pre/post-iteration checklists and verification processes.

2. Detailed backend API testing instructions covering authentication endpoints, task management endpoints, authorization testing, automated testing approaches, and performance testing.

3. Comprehensive frontend integration testing steps including component-level testing, page-level testing, API communication testing, state management validation, accessibility testing, and cross-browser testing.

4. Extensive security verification steps for JWT authentication (token generation/validation, session management) and user isolation (data access control, authorization validation, security best practices).

5. Complete regression checks for task CRUD operations including create, read, update, delete operations and cross-operation verification with concurrency testing.

6. A structured bug identification and specification update workflow with issue discovery, root cause analysis, gap analysis, and resolution processes.

7. An iteration cycle for improving features with continuous improvement processes, feedback collection, analysis and prioritization, refinement identification, and quality assurance steps.

8. Complete completion criteria for Phase II covering functional requirements, security requirements, performance requirements, quality requirements, and constitutional compliance verification.

9. Clear Phase II scope constraints defining in-scope activities (authentication, task management, security, etc.) and out-of-scope activities (chatbot, voice commands, multi-language support, etc.) with a verification checklist.

The document follows the constitutional requirements and aligns with all specifications while maintaining focus on quality assurance and SDD maturity.

## Outcome

- ✅ Impact: Created comprehensive QA and iteration workflow for the project
- 🧪 Tests: No automated tests for document creation
- 📁 Files: Created specs/01-web-todo-app/iterations.md
- 🔁 Next prompts: Ready to begin iterative development and testing cycles
- 🧠 Reflection: The document provides a mature framework for quality assurance and continuous improvement

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard QA workflow creation
- Next experiment (smallest change to try): Begin using the iteration workflow for testing and validation