from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, ForeignKey


class Task(SQLModel, table=True):
    """
    Task model for the Todo Web Application.

    Represents a task in the system with title, description, completion status,
    and ownership relationship to a User.
    """

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    completed: bool = Field(default=False)
    owner_id: int = Field(sa_column=Column(Integer, ForeignKey("user.id")))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default=None)

    def __repr__(self):
        return f"<Task(id={self.id}, title='{self.title}', completed={self.completed})>"

    def __str__(self):
        status = "completed" if self.completed else "pending"
        return f"Task: {self.title} ({status})"