from typing import AsyncGenerator
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine
from sqlalchemy import create_engine as sync_create_engine
from sqlalchemy.orm import sessionmaker
import os
from contextlib import asynccontextmanager

# Database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

# Create async engine - use different approach for SQLite vs PostgreSQL
if DATABASE_URL.startswith("postgresql"):
    # For PostgreSQL, use async engine directly
    async_engine: AsyncEngine = create_async_engine(DATABASE_URL)
    # Also create a sync engine for sync operations
    sync_engine = sync_create_engine(DATABASE_URL)
elif DATABASE_URL.startswith("sqlite"):
    # For SQLite, we need to use the async engine with special settings
    async_engine: AsyncEngine = create_async_engine(
        DATABASE_URL.replace("sqlite:///", "sqlite+aiosqlite:///"),
        connect_args={"check_same_thread": False}
    )
    # Also create a sync engine for sync operations
    sync_engine = sync_create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:
    # Default to SQLite with aiosqlite
    async_engine: AsyncEngine = create_async_engine(
        DATABASE_URL.replace("sqlite:///", "sqlite+aiosqlite:///"),
        connect_args={"check_same_thread": False}
    )
    # Also create a sync engine for sync operations
    sync_engine = sync_create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )

# Create sync sessionmaker
SyncSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Async session dependency for FastAPI routes.
    Provides a database session for each request.
    """
    async with AsyncSession(async_engine) as session:
        yield session

def get_sync_session():
    """
    Sync session dependency for routes that need synchronous operations.
    """
    db = SyncSessionLocal()
    try:
        yield db
    finally:
        db.close()

async def close_db_connection():
    """
    Close the database connection pool.
    """
    await async_engine.dispose()