@echo off
REM Startup script for the Todo Web Application backend on Windows

REM Install dependencies
pip install -r requirements.txt

REM Run database migrations
alembic upgrade head

REM Start the FastAPI application
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload