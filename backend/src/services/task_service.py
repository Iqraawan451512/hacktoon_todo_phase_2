from sqlmodel import Session, select
from typing import Optional, List
from ..models.task import Task


class TaskService:
    """
    Service class for handling task-related operations.

    Provides methods for task creation, retrieval, updating, and deletion
    with owner isolation to ensure users can only access their own tasks.
    """

    def create_task(self, db_session: Session, title: str, description: Optional[str], owner_id: int) -> Task:
        """
        Create a new task for the specified user.

        Args:
            db_session: Database session for SQLModel operations
            title: Title for the new task
            description: Optional description for the new task
            owner_id: ID of the user who owns the task

        Returns:
            Task: The created Task object
        """
        task = Task(
            title=title,
            description=description,
            owner_id=owner_id
        )

        db_session.add(task)
        db_session.commit()
        db_session.refresh(task)

        return task

    def get_task_by_id(self, db_session: Session, task_id: int, owner_id: int) -> Optional[Task]:
        """
        Retrieve a specific task by its ID and owner ID.

        Args:
            db_session: Database session for SQLModel operations
            task_id: ID of the task to retrieve
            owner_id: ID of the user who owns the task

        Returns:
            Task: The task object if found and owned by the user, None otherwise
        """
        statement = select(Task).where(Task.id == task_id, Task.owner_id == owner_id)
        result = db_session.execute(statement)
        task = result.scalars().first()
        return task

    def get_tasks_by_user(self, db_session: Session, owner_id: int) -> List[Task]:
        """
        Retrieve all tasks for a specific user.

        Args:
            db_session: Database session for SQLModel operations
            owner_id: ID of the user whose tasks to retrieve

        Returns:
            List[Task]: List of tasks owned by the user
        """
        statement = select(Task).where(Task.owner_id == owner_id)
        result = db_session.execute(statement)
        tasks = result.scalars().all()
        return tasks

    def update_task(
        self,
        db_session: Session,
        task_id: int,
        owner_id: int,
        title: Optional[str] = None,
        description: Optional[str] = None,
        completed: Optional[bool] = None
    ) -> Optional[Task]:
        """
        Update an existing task if it belongs to the specified user.

        Args:
            db_session: Database session for SQLModel operations
            task_id: ID of the task to update
            owner_id: ID of the user who owns the task
            title: New title for the task (optional)
            description: New description for the task (optional)
            completed: New completion status for the task (optional)

        Returns:
            Task: The updated Task object if successful, None if task not found or not owned by user
        """
        # First, get the task to ensure it exists and is owned by the user
        task = self.get_task_by_id(db_session, task_id, owner_id)

        if not task:
            return None

        # Update the task with provided values
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        if completed is not None:
            task.completed = completed

        task.updated_at = None  # Will be updated by SQLModel's default behavior

        db_session.add(task)
        db_session.commit()
        db_session.refresh(task)

        return task

    def delete_task(self, db_session: Session, task_id: int, owner_id: int) -> bool:
        """
        Delete a task if it belongs to the specified user.

        Args:
            db_session: Database session for SQLModel operations
            task_id: ID of the task to delete
            owner_id: ID of the user who owns the task

        Returns:
            bool: True if task was successfully deleted, False if task not found or not owned by user
        """
        # First, get the task to ensure it exists and is owned by the user
        task = self.get_task_by_id(db_session, task_id, owner_id)

        if not task:
            return False

        db_session.delete(task)
        db_session.commit()

        return True