# [EDIT: Service Name]

[EDIT: What this service does in one sentence]

## Stack

- **Language:** Go [EDIT: 1.22 / 1.23]
- **HTTP:** [EDIT: net/http (stdlib) / chi / echo / gin / fiber]
- **Database:** [EDIT: PostgreSQL via pgx / SQLite via mattn / none]
- **Migrations:** [EDIT: goose / golang-migrate / atlas]
- **Config:** [EDIT: envconfig / viper / env vars only]
- **Logging:** [EDIT: slog (stdlib) / zerolog / zap]
- **Deployment:** [EDIT: Docker / Fly.io / bare binary / Kubernetes]

## Project Structure

```
[EDIT: service-name]/
├── cmd/
│   └── server/
│       └── main.go          # Entrypoint — wires dependencies, starts server
├── internal/                # Private application code
│   ├── config/              # Configuration loading
│   ├── handler/             # HTTP handlers (thin — parse request, call service, write response)
│   ├── service/             # Business logic
│   ├── repository/          # Database access
│   ├── model/               # Domain types
│   └── middleware/           # HTTP middleware
├── pkg/                     # Public library code (if any — often empty)
├── migrations/              # SQL migration files
├── go.mod
├── go.sum
├── Dockerfile
└── Makefile
```

## Conventions

### Go Style
- Follow standard Go conventions — `gofmt`, `go vet`, `staticcheck`
- Use `internal/` for all application code — this is a service, not a library
- Interfaces are defined by the consumer, not the provider
- Error handling: wrap errors with context using `fmt.Errorf("doing thing: %w", err)`
- No `panic` except in init/startup for truly unrecoverable situations

### Architecture Layers
- **handler → service → repository** is the dependency flow
- Handlers know about HTTP. Services don't. Repositories know about SQL. Services don't.
- Dependencies injected as interfaces via constructors: `NewUserService(repo UserRepository) *UserService`
- No global state. No init() side effects. Wire everything in main.go.

### Error Handling
- Define domain errors in `model/errors.go`: `var ErrUserNotFound = errors.New("user not found")`
- Services return domain errors
- Handlers map domain errors to HTTP status codes
- Always handle errors — no `_` on error returns unless there's a comment explaining why

### Naming
- Packages: short, lowercase, no underscores (`handler`, not `http_handlers`)
- Interfaces: describe behavior (`UserRepository`, `Notifier`), not implementation
- Constructors: `New[Type](deps) *Type`
- No stuttering: `user.Service`, not `user.UserService`

### Testing
- Table-driven tests for handlers and services
- Use interfaces for mocking — no mocking frameworks needed
- Test files: `thing_test.go` next to `thing.go`
- Integration tests use build tag: `//go:build integration`
- Run: `go test ./...`

### Database
- Use `sqlc` or hand-written SQL — no ORMs
- Prepared statements for frequently-run queries
- Transactions for multi-step operations: pass `*sql.Tx` or use a transaction helper
- Connection pooling configured in main.go

## Key Commands

```bash
[EDIT: your actual commands]
dev:      go run ./cmd/server
build:    go build -o bin/server ./cmd/server
test:     go test ./...
lint:     golangci-lint run
migrate:  goose -dir migrations postgres "$DATABASE_URL" up
docker:   docker build -t [service-name] .
```

## Important Context

[EDIT: Add service-specific context]
- What external services does this talk to?
- What's the expected load/scale?
- Hot paths that need to be performant
- Known tech debt

## Do NOT

- Don't use ORMs (gorm, ent) — write SQL or use sqlc
- Don't use `interface{}` / `any` when a concrete type will do
- Don't add dependencies for things the stdlib handles (HTTP routing is the exception)
- Don't use context.Background() in request handling — always propagate the request context
- Don't log and return an error — do one or the other
- [EDIT: project-specific guardrails]
