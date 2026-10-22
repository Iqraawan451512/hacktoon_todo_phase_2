#!/bin/bash
# Startup script for the Todo Web Application backend

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start the FastAPI application
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload