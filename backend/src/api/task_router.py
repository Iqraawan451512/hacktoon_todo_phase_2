from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlmodel import Session
from typing import List
from datetime import datetime

from ..models.task import Task
from ..services.task_service import TaskService
from ..database.database import get_sync_session
from ..middleware.auth_middleware import get_current_user_id

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/", response_model=List[Task])
async def get_user_tasks(
    current_user_id: int = Depends(get_current_user_id),
    db_session: Session = Depends(get_sync_session),
) -> List[Task]:
    """
    Get all tasks for the current user.

    Args:
        current_user_id: ID of the current user (extracted from JWT)
        db_session: Database session for SQLModel operations

    Returns:
        List[Task]: List of tasks belonging to the current user
    """
    task_service = TaskService()

    tasks = task_service.get_tasks_by_user(db_session, current_user_id)
    return tasks


@router.post("/", response_model=Task)
async def create_task(
    title: str = Form(...),
    description: str = Form(None),
    current_user_id: int = Depends(get_current_user_id),
    db_session: Session = Depends(get_sync_session),
) -> Task:
    """
    Create a new task for the current user.

    Args:
        title: Title of the task
        description: Optional description of the task
        current_user_id: ID of the current user (extracted from JWT)
        db_session: Database session for SQLModel operations

    Returns:
        Task: The created task
    """
    task_service = TaskService()

    task = task_service.create_task(db_session, title, description, current_user_id)
    return task


@router.get("/{task_id}", response_model=Task)
async def get_task(
    task_id: int,
    current_user_id: int = Depends(get_current_user_id),
    db_session: Session = Depends(get_sync_session),
) -> Task:
    """
    Get a specific task by ID.

    Args:
        task_id: ID of the task to retrieve
        current_user_id: ID of the current user (extracted from JWT)
        db_session: Database session for SQLModel operations

    Returns:
        Task: The requested task
    """
    task_service = TaskService()

    task = task_service.get_task_by_id(db_session, task_id, current_user_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user",
        )

    return task


@router.put("/{task_id}", response_model=Task)
async def update_task(
    task_id: int,
    title: str = Form(None),
    description: str = Form(None),
    completed: bool = Form(None),
    current_user_id: int = Depends(get_current_user_id),
    db_session: Session = Depends(get_sync_session),
) -> Task:
    """
    Update a specific task.

    Args:
        task_id: ID of the task to update
        title: New title for the task (optional)
        description: New description for the task (optional)
        completed: New completion status for the task (optional)
        current_user_id: ID of the current user (extracted from JWT)
        db_session: Database session for SQLModel operations

    Returns:
        Task: The updated task
    """
    task_service = TaskService()

    updated_task = task_service.update_task(
        db_session, task_id, current_user_id, title, description, completed
    )
    if not updated_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user",
        )

    return updated_task


@router.delete("/{task_id}")
async def delete_task(
    task_id: int,
    current_user_id: int = Depends(get_current_user_id),
    db_session: Session = Depends(get_sync_session),
) -> dict:
    """
    Delete a specific task.

    Args:
        task_id: ID of the task to delete
        current_user_id: ID of the current user (extracted from JWT)
        db_session: Database session for SQLModel operations

    Returns:
        dict: Success message
    """
    task_service = TaskService()

    deleted = task_service.delete_task(db_session, task_id, current_user_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user",
        )

    return {"message": "Task deleted successfully"}


@router.patch("/{task_id}/complete")
async def toggle_task_completion(
    task_id: int,
    current_user_id: int = Depends(get_current_user_id),
    db_session: Session = Depends(get_sync_session),
) -> Task:
    """
    Toggle the completion status of a task.

    Args:
        task_id: ID of the task to toggle
        current_user_id: ID of the current user (extracted from JWT)
        db_session: Database session for SQLModel operations

    Returns:
        Task: The updated task with toggled completion status
    """
    task_service = TaskService()

    # Get the current task state
    current_task = task_service.get_task_by_id(db_session, task_id, current_user_id)
    if not current_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user",
        )

    # Toggle completion status
    updated_task = task_service.update_task(
        db_session, task_id, current_user_id, completed=not current_task.completed
    )

    return updated_task