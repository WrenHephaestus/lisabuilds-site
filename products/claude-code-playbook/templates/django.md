# [EDIT: Project Name]

[EDIT: What this Django project does]

## Stack

- **Framework:** Django [EDIT: 5.0 / 5.1]
- **Python:** [EDIT: 3.12 / 3.13]
- **Database:** [EDIT: PostgreSQL / SQLite (dev only)]
- **Frontend:** [EDIT: Django templates + HTMX / DRF + React / DRF + Next.js]
- **Task queue:** [EDIT: Celery + Redis / Django-Q2 / Huey / none]
- **Cache:** [EDIT: Redis / Memcached / none]
- **Search:** [EDIT: PostgreSQL full-text / Elasticsearch / Meilisearch / none]
- **File storage:** [EDIT: S3 via django-storages / local / Cloudflare R2]
- **Deployment:** [EDIT: Docker + Gunicorn / Fly.io / Railway / VPS]

## Project Structure

```
[EDIT: project-name]/
├── config/                  # Project settings (renamed from default project dir)
│   ├── settings/
│   │   ├── base.py          # Shared settings
│   │   ├── development.py   # Dev overrides
│   │   └── production.py    # Production overrides
│   ├── urls.py              # Root URL conf
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── accounts/            # User model, auth, profiles
│   ├── core/                # Shared models, mixins, utilities
│   └── [EDIT: domain]/      # Feature app
│       ├── models.py
│       ├── views.py         # [EDIT: or api/views.py + api/serializers.py for DRF]
│       ├── urls.py
│       ├── admin.py
│       ├── forms.py
│       ├── services.py      # Business logic (not in views or models)
│       ├── selectors.py     # Complex queries (not in views)
│       ├── tests/
│       └── templates/[app]/ # App-specific templates
├── templates/               # Project-level templates (base, emails)
├── static/                  # Project-level static files
├── media/                   # User uploads (dev only — S3 in prod)
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
└── manage.py
```

## Conventions

### Architecture: Fat Services, Thin Views, Thin Models
- **Models:** Schema + basic validation + `__str__`. No business logic. No complex queries.
- **Views:** Parse request, call service, return response. Under 20 lines ideally.
- **Services (`services.py`):** All business logic lives here. Testable without HTTP.
- **Selectors (`selectors.py`):** Complex QuerySet chains and annotations. Return QuerySets, not lists.
- This keeps views and models clean and makes business logic testable.

### Models
- Custom User model in `accounts` app (always — even if it's just `AbstractUser` with nothing added yet. Migrating later is painful beyond description)
- `TimeStampedModel` base class with `created_at` / `updated_at` in `core`
- Use `related_name` on every ForeignKey — never rely on Django's default `_set`
- Use `db_index=True` on fields you filter/sort by frequently
- Write model `Meta` ordering only if there's a natural, universal ordering

### URLs
- App URLs namespaced: `app_name = "accounts"` → `{% url "accounts:profile" %}`
- RESTful patterns: `things/`, `things/<pk>/`, `things/<pk>/edit/`
- [EDIT: DRF users: use routers, version your API: `/api/v1/`]

### Templates (if using Django templates)
- Base template in `templates/base.html` with blocks: `title`, `content`, `extra_css`, `extra_js`
- App templates in `templates/[app_name]/[template].html`
- Use `{% include %}` for reusable components, `{% extends %}` for layouts
- [EDIT: HTMX users: partial templates in `templates/[app]/partials/`]

### Admin
- Register every model — even if basic. Admin is free CRUD.
- Use `list_display`, `list_filter`, `search_fields` on every ModelAdmin
- Custom admin actions for bulk operations

### Testing
- Test services thoroughly — that's where the logic is
- Use `pytest-django` with fixtures (not Django's TestCase unless needed for transactions)
- Factory Boy for model instances — never create test data manually
- Run: `[EDIT: pytest / python manage.py test]`

## Key Commands

```bash
[EDIT: your actual commands]
dev:        python manage.py runserver
shell:      python manage.py shell_plus   # (django-extensions)
test:       pytest
makemig:    python manage.py makemigrations
migrate:    python manage.py migrate
createsup:  python manage.py createsuperuser
static:     python manage.py collectstatic
celery:     celery -A config worker -l info
```

## Important Context

[EDIT: project-specific notes]
- What feature are you building now?
- Which apps are stable vs. in active development?
- Any django-specific gotchas (custom middleware, signal side effects, etc.)
- Third-party packages to be aware of

## Do NOT

- Don't put business logic in views or models — use services
- Don't use `Model.objects.all()` in templates — always filter in the view/selector
- Don't use `null=True` on string fields — use `blank=True, default=""`
- Don't create migrations on fields that only change Python behavior (help_text, verbose_name)
- Don't use signals for business logic — they hide control flow, make debugging a nightmare, and train your team to fear `post_save`. Call service functions explicitly.
- [EDIT: project-specific guardrails]
