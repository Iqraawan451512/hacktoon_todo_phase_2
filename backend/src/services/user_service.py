from sqlmodel import Session, select
from typing import Optional
from passlib.context import CryptContext
from ..models.user import User


class UserService:
    """
    Service class for handling user-related operations.

    Provides methods for user creation, retrieval, and password management.
    """

    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def create_user(self, db_session: Session, username: str, email: str, password: str) -> User:
        """
        Create a new user with the provided details.

        Args:
            db_session: Database session for SQLModel operations
            username: Username for the new user
            email: Email address for the new user
            password: Plain text password to be hashed

        Returns:
            User: The created User object
        """
        hashed_password = self.hash_password(password)

        user = User(
            username=username,
            email=email,
            hashed_password=hashed_password
        )

        db_session.add(user)
        db_session.commit()
        db_session.refresh(user)

        return user

    def get_user_by_id(self, db_session: Session, user_id: int) -> Optional[User]:
        """
        Retrieve a user by their ID.

        Args:
            db_session: Database session for SQLModel operations
            user_id: ID of the user to retrieve

        Returns:
            User: The user object if found, None otherwise
        """
        statement = select(User).where(User.id == user_id)
        result = db_session.execute(statement)
        user = result.scalars().first()
        return user

    def get_user_by_username(self, db_session: Session, username: str) -> Optional[User]:
        """
        Retrieve a user by their username.

        Args:
            db_session: Database session for SQLModel operations
            username: Username of the user to retrieve

        Returns:
            User: The user object if found, None otherwise
        """
        statement = select(User).where(User.username == username)
        result = db_session.execute(statement)
        user = result.scalars().first()
        return user

    def get_user_by_email(self, db_session: Session, email: str) -> Optional[User]:
        """
        Retrieve a user by their email address.

        Args:
            db_session: Database session for SQLModel operations
            email: Email address of the user to retrieve

        Returns:
            User: The user object if found, None otherwise
        """
        statement = select(User).where(User.email == email)
        result = db_session.execute(statement)
        user = result.scalars().first()
        return user

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """
        Verify a plaintext password against a hashed password.

        Args:
            plain_password: Plaintext password to verify
            hashed_password: Hashed password to compare against

        Returns:
            bool: True if passwords match, False otherwise
        """
        return self.pwd_context.verify(plain_password, hashed_password)

    def hash_password(self, plain_password: str) -> str:
        """
        Generate a hash for a plaintext password.

        Args:
            plain_password: Plaintext password to hash

        Returns:
            str: The hashed password
        """
        return self.pwd_context.hash(plain_password)