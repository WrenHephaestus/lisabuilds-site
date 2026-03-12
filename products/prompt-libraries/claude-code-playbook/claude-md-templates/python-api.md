# [EDIT: Project Name]

[EDIT: One-line description of what this API does]

## Stack

- **Framework:** FastAPI
- **Python:** [EDIT: 3.11 / 3.12 / 3.13]
- **Package manager:** [EDIT: uv / pip / poetry]
- **Database:** [EDIT: PostgreSQL via SQLAlchemy / Tortoise ORM / raw asyncpg]
- **Cache:** [EDIT: Redis / none]
- **Task queue:** [EDIT: Celery / ARQ / none]
- **Auth:** [EDIT: JWT / OAuth2 / API keys]
- **Deployment:** [EDIT: Docker / Fly.io / Railway / AWS Lambda]

> This template is built around FastAPI because it's what most solo devs and small teams actually reach for — async by default, Pydantic baked in, auto-generated docs. The layered architecture here (routers → services → repositories) adapts to Flask or Django REST Framework if that's your situation, but the specifics assume FastAPI. If you're on Flask, you'll swap routers for blueprints and lose the dependency injection magic. Django REST gives you most of this structure for free through serializers and viewsets. But the separation of concerns translates either way.

## Project Structure

```
[EDIT: project-name]/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app, lifespan, middleware
│   ├── config.py            # Settings via pydantic-settings
│   ├── dependencies.py      # Dependency injection (db sessions, auth, etc.)
│   ├── models/              # SQLAlchemy / ORM models
│   ├── schemas/             # Pydantic request/response schemas
│   ├── routers/             # Route handlers, grouped by domain
│   │   ├── auth.py
│   │   ├── users.py
│   │   └── [EDIT: domain].py
│   ├── services/            # Business logic — framework-free
│   ├── repositories/        # Database queries — services never touch the ORM directly
│   └── utils/               # Helpers, shared utilities
├── tests/
│   ├── conftest.py          # Fixtures, test client, db setup
│   ├── test_[domain].py
│   └── factories/           # Test data (factory_boy or hand-rolled)
├── migrations/              # Alembic
├── pyproject.toml
├── Dockerfile
└── docker-compose.yml
```

## Conventions

### Code Style
- PEP 8, enforced by [EDIT: ruff / black + isort]
- Type hints on all function signatures, enforced by [EDIT: mypy / pyright]
- `async def` for route handlers and service methods. FastAPI is async-native — lean into it.
- Pydantic models for all API input/output. Never return raw dicts from an endpoint. Just don't.

### The Layer Rule

This matters more than anything else in here.

- **Routers** handle HTTP. Request parsing, status codes, response formatting. They call services.
- **Services** contain business logic. They don't import FastAPI. They don't know what HTTP is. They call repositories.
- **Repositories** talk to the database. Services never touch the ORM directly.

Three layers. Don't collapse them. It feels like overkill on a small project until you need to test your business logic without spinning up a test server, or swap Postgres for SQLite in tests, or reuse a service from a CLI tool. Then it feels obvious.

### Naming
- Files: `snake_case.py` (`user_service.py`, `auth_router.py`)
- Classes: `PascalCase` (`UserService`, `CreateUserRequest`)
- Functions: `snake_case` (`get_user_by_id`)
- Constants: `SCREAMING_SNAKE_CASE`
- Pydantic schemas: `[Action][Entity][Request|Response]` — so `CreateUserRequest`, `UserResponse`, `UpdateProjectRequest`. Predictable beats clever.

### Error Handling

- `HTTPException` lives in routers only. Nowhere else.
- Services raise domain exceptions: `UserNotFoundError`, `InsufficientBalanceError`, whatever fits.
- Routers catch those and map them to HTTP status codes.
- If your user hits a 500, something is genuinely broken. Expected failures (bad input, missing resource, auth failure) should never be 500s.

### Database
- Alembic for all migrations. No manual schema changes, ever.
- Explicit transactions for multi-step operations.
- Migrations run via: `[EDIT: alembic upgrade head / uv run alembic upgrade head]`

### Testing
- pytest + pytest-asyncio
- Factories for test data (factory_boy works well, or write your own — they're just functions)
- Each test is independent. Sets up its own data, tears it down. No test ordering dependencies.
- Run: `[EDIT: pytest -v / uv run pytest -v]`

## Key Commands

```bash
[EDIT: your actual commands]
dev:           uvicorn app.main:app --reload
test:          pytest -v
lint:          ruff check .
format:        ruff format .
typecheck:     mypy app/
migrate:       alembic upgrade head
new-migration: alembic revision --autogenerate -m "description"
```

## API Docs

FastAPI generates these for free:
- Swagger UI at `/docs`
- ReDoc at `/redoc`

[EDIT: versioning strategy, rate limits, any API-specific notes]

## Important Context

[EDIT: Fill these in — this is where the template becomes yours]
- What feature are you building right now?
- External APIs you're integrating with (and their quirks)
- Performance-sensitive endpoints
- Known tech debt you're choosing to live with

## Do NOT

- Don't use `from typing import Optional` — use `X | None` (Python 3.10+)
- Don't put business logic in routers. (Yes, this is listed twice. It's that important.)
- Don't use raw SQL unless you've profiled and the ORM is the actual bottleneck
- Don't modify migration files after they've been applied to any environment
- [EDIT: your project-specific guardrails]
