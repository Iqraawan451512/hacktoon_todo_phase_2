from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
from typing import Optional
from ..services.auth import verify_token, get_current_user_payload

security = HTTPBearer()

def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> int:
    """
    Dependency to get the current user ID from JWT token.

    Args:
        credentials: HTTP authorization credentials from the request

    Returns:
        int: User ID extracted from the JWT token

    Raises:
        HTTPException: If token is invalid or expired
    """
    token = credentials.credentials

    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id: int = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user_id

def get_current_active_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> int:
    """
    Dependency to get the current active user ID from JWT token.
    This can be extended to check if the user is active if needed.

    Args:
        credentials: HTTP authorization credentials from the request

    Returns:
        int: User ID extracted from the JWT token

    Raises:
        HTTPException: If token is invalid or expired
    """
    user_id = get_current_user_id(credentials)

    # Additional checks could be added here if needed (e.g., user activation status)

    return user_id