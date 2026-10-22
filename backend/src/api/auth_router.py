from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import HTTPBearer
from typing import Dict, Any
from sqlmodel import Session
from datetime import timedelta

from ..models.user import User
from ..services.auth import (
    authenticate_user,
    create_access_token,
    get_password_hash,
)
from ..services.user_service import UserService
from ..database.database import get_sync_session
from ..middleware.auth_middleware import get_current_user_id

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
async def register_user(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db_session: Session = Depends(get_sync_session),
) -> Dict[str, Any]:
    """
    Register a new user.

    Args:
        username: Desired username
        email: User's email address
        password: User's password
        db_session: Database session for SQLModel operations

    Returns:
        Dict: User information and access token
    """
    user_service = UserService()

    # Check if user already exists
    existing_user = user_service.get_user_by_email(db_session, email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    existing_username = user_service.get_user_by_username(db_session, username)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken",
        )

    # Create new user
    user = user_service.create_user(db_session, username, email, password)

    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )

    return {
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        },
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post("/login")
async def login_user(
    email: str = Form(...),
    password: str = Form(...),
    db_session: Session = Depends(get_sync_session),
) -> Dict[str, Any]:
    """
    Authenticate user and return access token.

    Args:
        email: User's email address
        password: User's password
        db_session: Database session for SQLModel operations

    Returns:
        Dict: User information and access token
    """
    user_service = UserService()

    user = user_service.get_user_by_email(db_session, email)
    if not user or not user_service.verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )

    return {
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        },
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/me")
async def get_current_user(
    current_user_id: int = Depends(get_current_user_id),
    db_session: Session = Depends(get_sync_session),
) -> Dict[str, Any]:
    """
    Get current user information.

    Args:
        current_user_id: ID of the current user (extracted from JWT)
        db_session: Database session for SQLModel operations

    Returns:
        Dict: Current user information
    """
    user_service = UserService()

    user = user_service.get_user_by_id(db_session, current_user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
    }