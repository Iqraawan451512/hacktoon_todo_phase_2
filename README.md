# Phase II Todo Web Application

A full-stack Todo Web Application built with FastAPI, SQLModel, Neon PostgreSQL, JWT Authentication (backend) and Next.js 16+, TypeScript, Tailwind CSS (frontend).

## Tech Stack

### Backend
- **Framework**: FastAPI
- **ORM**: SQLModel (SQLAlchemy + Pydantic)
- **Database**: PostgreSQL (compatible with Neon PostgreSQL)
- **Authentication**: JWT-based with python-jose
- **Database Driver**: asyncpg for async PostgreSQL operations

### Frontend
- **Framework**: Next.js 16+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Architecture**: App Router (Next.js 13+)

## Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL (or Neon PostgreSQL account)

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend/
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database connection details:
```bash
# For local PostgreSQL
DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/todo_app

# For Neon PostgreSQL
DATABASE_URL=postgresql+asyncpg://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```

5. Run database migrations:
```bash
alembic upgrade head
```

6. Start the backend server:
```bash
# On Unix/Linux/Mac:
./start.sh

# On Windows:
start.bat

# Or directly with uvicorn:
todo web 
```

The backend will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info (protected)

### Tasks
- `GET /tasks` - Get all user tasks (protected)
- `POST /tasks` - Create a new task (protected)
- `GET /tasks/{id}` - Get a specific task (protected)
- `PUT /tasks/{id}` - Update a task (protected)
- `DELETE /tasks/{id}` - Delete a task (protected)
- `PATCH /tasks/{id}/complete` - Toggle task completion (protected)

## Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL database connection string
- `SECRET_KEY` - JWT secret key for token signing
- `ALGORITHM` - JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time

### Frontend (set via NEXT_PUBLIC_API_URL)
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)

## Features

- User registration and authentication
- JWT-based secure authentication
- Task management (CRUD operations)
- User isolation (users can only access their own tasks)
- Responsive frontend UI
- Type-safe API communication

## Phase II Compliance

This application adheres to Phase II requirements:
- No extra features beyond core functionality
- No advanced UI beyond functional placeholders
- No localization
- Clean, minimal implementation
- Proper backend/frontend separation

## Running the Application

1. Start the backend server (port 8000)
2. Start the frontend server (port 3000)
3. Access the application at `http://localhost:3000`
4. Register a new account or log in
5. Manage your tasks through the UI"# todo_app" 
