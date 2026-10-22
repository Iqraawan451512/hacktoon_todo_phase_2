---
id: 1
title: create-task-service
stage: red
date: 2026-01-13
surface: agent
model: claude-sonnet-4.5
feature: web-todo-app
branch: 01-web-todo-app
user: user
command: sp.implement
labels: [service, backend, sqlmodel, task, crud]
links:
  spec: ../specs/01-web-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/services/task_service.py
tests:
---
## Prompt

```text
You are a senior backend architect using Spec-Kit Plus.

Task: T010 - Create TaskService

Create the file `backend/src/services/task_service.py` for the Phase II Full-Stack Todo Web Application.

Project Context:
- Backend: FastAPI with SQLModel
- Spec-Driven Development: No manual coding allowed
- Phase II scope only: task service for CRUD operations

Requirements:
1. Implement a TaskService class or module
2. Include the following methods:
   - create_task(title: str, description: Optional[str], owner_id: int) -> Task
   - get_task_by_id(task_id: int, owner_id: int) -> Optional[Task]
   - get_tasks_by_user(owner_id: int) -> List[Task]
   - update_task(task_id: int, owner_id: int, title: Optional[str], description: Optional[str], completed: Optional[bool]) -> Task
   - delete_task(task_id: int, owner_id: int) -> None
3. Use SQLModel session for database operations
4. Ensure owner isolation (tasks are accessed only by their owner)
5. Ensure modular, importable code for API routers and TaskManager sub-agent
6. No UI, authentication, or localization code

Verification Checklist:
- File `backend/src/services/task_service.py` created
- TaskService implemented with all required methods
- Methods use SQLModel sessions with proper transaction handling
- Owner isolation enforced
- Fully Phase II compliant

Constraints:
- Keep changes Phase II safe
- Follow constitutional requirements (SQLModel, Neon PostgreSQL)
- Maintain clear, readable, maintainable code

Output only the content of `backend/src/services/task_service.py` ready for implementation.
```

## Response snapshot

Created the TaskService module for the backend application. The file backend/src/services/task_service.py includes:

1. TaskService class definition with proper documentation
2. All required methods implemented:
   - create_task: Creates a new task for the specified user
   - get_task_by_id: Retrieves a specific task by its ID and owner ID with owner isolation
   - get_tasks_by_user: Retrieves all tasks for a specific user
   - update_task: Updates an existing task if it belongs to the specified user
   - delete_task: Deletes a task if it belongs to the specified user
3. Proper imports for SQLModel, Session, select, and typing
4. All database operations using SQLModel sessions with proper transaction handling
5. Owner isolation enforced in all methods (tasks can only be accessed by their owner)
6. Clear documentation for each method
7. Proper error handling and return values

The implementation follows constitutional requirements using SQLModel for database operations and ensures proper user isolation. The service contains only task-related operations without UI, authentication, or localization code, maintaining Phase II compliance. The service is modular and ready for import by other components including API routers and the TaskManager sub-agent.

## Outcome

- ✅ Impact: Created comprehensive TaskService with all required methods and owner isolation
- 🧪 Tests: No automated tests for file creation
- 📁 Files: Created backend/src/services/task_service.py
- 🔁 Next prompts: Ready to proceed with next backend component
- 🧠 Reflection: The TaskService is properly configured with all required functionality and security

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard service creation
- Next experiment (smallest change to try): Continue with database migrations setup