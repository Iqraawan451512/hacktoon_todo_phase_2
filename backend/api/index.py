"""
Vercel serverless entry point for the FastAPI backend.

Vercel's Python runtime detects the ASGI `app` object exported here and
serves it directly; `vercel.json` rewrites every incoming path to this
function so FastAPI's own router handles the actual dispatch.
"""
import os
import sys

# Make the backend root (parent of this `api/` directory) importable so
# `src.main` resolves the same way it does when running
# `uvicorn src.main:app` from the backend directory locally.
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from src.main import app  # noqa: E402
