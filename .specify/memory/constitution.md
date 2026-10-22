<!-- Sync Impact Report:
Version change: N/A -> 1.0.0
Modified principles: N/A (new constitution)
Added sections: All principles and sections from user input
Removed sections: Template placeholder comments
Templates requiring updates: ✅ No updates needed to templates
Follow-up TODOs: None
-->
# Phase II Full-Stack Todo Web Application Constitution

## Core Principles

### Non-Negotiable Architectural Rules
The project must use a monorepo with clear separation of `frontend/` and `backend/`. Frontend and backend must not share runtime code or state. All persistent data must be stored in Neon Serverless PostgreSQL. All backend data access must go through SQLModel. No architectural shortcuts or alternative stacks are permitted.

### Spec-First Development Rules
Specifications are the single source of truth. No implementation may be created or modified without an explicit spec. If requirements change, specs must be updated first, then implementation aligned. Claude Code must always reference relevant specs using `@specs/...`.

### Security & Authentication Principles
Authentication is handled via Better Auth issuing JWT tokens. Every API request must require a valid JWT. Backend must verify JWT signature and expiry using a shared secret. User identity must be derived from the JWT, not from client input. Strict user isolation is mandatory: users may only access their own tasks.

### API Design Constraints
APIs must be RESTful, stateless, and JSON-based. All endpoints must be secured by JWT authentication. All task operations must be scoped to the authenticated user. Unauthorized requests must return 401 Unauthorized. Ownership checks are required for all read/write operations.

### Frontend–Backend Separation Rules
Frontend (Next.js) handles: UI rendering, User interaction, Authentication flow with Better Auth. Backend (FastAPI) handles: Business logic, Data persistence, Authorization and ownership enforcement. Frontend must never bypass backend security logic.

### Claude Code Behavioral Rules
Claude Code must: Follow all relevant specs and this constitution strictly, Generate plans and tasks before implementation, Implement features incrementally and transparently. Claude Code must not: Add features not defined in specs, Modify behavior without spec changes, Collapse multiple concerns into a single step, Assume intent beyond what is explicitly specified.

## Change Management Rules
All changes begin with a spec update. Spec changes must be explicit and reviewable. Code must be regenerated or updated only after spec approval. Historical consistency between specs and implementation must be preserved.

## Quality Standards
Emphasize clarity over cleverness. Code must be: Readable, Maintainable, Minimal. Avoid over-engineering and unnecessary abstractions. Follow idiomatic patterns for each technology used.

## Governance
Phase Awareness (Phase II Only): Scope is strictly limited to Phase II: Web Application. Required features: Task CRUD, Authentication, Secure REST API, Persistent storage. Chatbot, voice commands, and multi-language support are out of scope unless explicitly specified for bonus extensions. This constitution is binding for all Claude Code actions within Phase II.

**Version**: 1.0.0 | **Ratified**: 2026-01-13 | **Last Amended**: 2026-01-13