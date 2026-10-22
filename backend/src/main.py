import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from .api.auth_router import router as auth_router
from .api.task_router import router as task_router
from .database.database import async_engine, sync_engine

# Create any tables that don't exist yet (e.g. a fresh Postgres database on
# first deploy). This only runs once per cold start (module import is
# cached for the life of the serverless container) and create_all() never
# drops or alters tables that already exist, so it's safe to call every
# time - the normal migration path (alembic upgrade head) is still the
# source of truth for schema changes going forward.
SQLModel.metadata.create_all(sync_engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    yield
    # Shutdown
    await async_engine.dispose()

app = FastAPI(
    title="Todo Web Application API",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware. Defaults to the deployed frontend plus local dev;
# override/extend via the CORS_ORIGINS env var (comma-separated origins,
# no trailing slashes) without needing a code change, e.g. to add a Vercel
# preview deployment URL.
DEFAULT_CORS_ORIGINS = [
    "https://hacktoon-todo-frontend.vercel.app",
    "http://localhost:3000",
]
cors_origins_env = os.getenv("CORS_ORIGINS")
allow_origins = (
    [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]
    if cors_origins_env
    else DEFAULT_CORS_ORIGINS
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers
app.include_router(auth_router)
app.include_router(task_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo Web Application API"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": "2026-01-14T00:00:00Z"}