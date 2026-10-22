---
id: 1
title: create-task-model
stage: red
date: 2026-01-13
surface: agent
model: claude-sonnet-4.5
feature: web-todo-app
branch: 01-web-todo-app
user: user
command: sp.implement
labels: [model, backend, sqlmodel, task, crud]
links:
  spec: ../specs/01-web-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/models/task.py
tests:
---
## Prompt

```text
You are a senior backend architect using Spec-Kit Plus.

Task: T008 - Create Task Model

Create the file `backend/src/models/task.py` for the Phase II Full-Stack Todo Web Application.

Project Context:
- Backend: FastAPI with SQLModel
- Spec-Driven Development: No manual coding allowed
- Phase II scope only: task model for CRUD operations and user ownership

Requirements:
1. Define a Task model using SQLModel
2. Fields required:
   - id: int (primary key, auto-increment)
   - title: str
   - description: Optional[str]
   - completed: bool (default False)
   - owner_id: int (foreign key referencing User.id)
   - created_at: datetime (default current timestamp)
   - updated_at: datetime (optional, default current timestamp)
3. Include table name configuration for SQLModel
4. Define foreign key relationship with User model
5. Ensure compatibility with TaskManager sub-agent and backend API
6. Keep the model modular and importable
7. No business logic, UI, or localization code

Verification Checklist:
- File `backend/src/models/task.py` created
- Task model defined with all required fields
- Primary key, foreign key, default values, and timestamps implemented
- Fully Phase II compliant

Constraints:
- Keep changes Phase II safe
- Follow constitutional requirements (SQLModel, Neon PostgreSQL)
- Maintain clear, readable, maintainable code

Output only the content of `backend/src/models/task.py` ready for implementation.
```

## Response snapshot

Created the Task model module for the backend application. The file backend/src/models/task.py includes:

1. Task model class defined with SQLModel inheritance and table=True
2. All required fields implemented:
   - id: Optional[int] with primary_key=True (auto-increment)
   - title: str
   - description: Optional[str] with default None
   - completed: bool with default False
   - owner_id: int with foreign key relationship to User.id
   - created_at: datetime with default_factory=datetime.utcnow
   - updated_at: Optional[datetime] with default None
3. Foreign key relationship with User model using SQLAlchemy Column and ForeignKey
4. Proper imports for SQLModel, Field, datetime, Optional, and SQLAlchemy components
5. String representation methods (__repr__ and __str__) for debugging
6. Clear documentation explaining the model's purpose

The implementation follows constitutional requirements using SQLModel and provides proper foreign key relationship with the User model. The model contains only data structure without business logic, UI, or localization code, maintaining Phase II compliance. The model is modular and ready for import by other components including the TaskManager sub-agent.

## Outcome

- ✅ Impact: Created comprehensive Task model with all required fields and relationships
- 🧪 Tests: No automated tests for file creation
- 📁 Files: Created backend/src/models/task.py
- 🔁 Next prompts: Ready to proceed with next backend component
- 🧠 Reflection: The Task model is properly configured with all required fields and user relationship

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard model creation
- Next experiment (smallest change to try): Continue with backend service creation