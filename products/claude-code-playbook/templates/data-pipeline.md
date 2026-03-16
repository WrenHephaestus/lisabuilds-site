# [EDIT: Pipeline Name]

[EDIT: What data this pipeline processes and why]

## Stack

- **Language:** Python [EDIT: 3.11 / 3.12]
- **Orchestration:** [EDIT: Airflow / Prefect / Dagster / cron + scripts]
- **Data processing:** [EDIT: pandas / Polars / PySpark / DuckDB]
- **Storage:** [EDIT: PostgreSQL / BigQuery / S3 + Parquet / Snowflake]
- **Queue/streaming:** [EDIT: none / Kafka / Redis Streams / SQS]
- **Monitoring:** [EDIT: Sentry / custom alerting / none]

## Project Structure

```
[EDIT: pipeline-name]/
├── pipelines/
│   ├── [EDIT: pipeline_name]/
│   │   ├── extract.py        # Data extraction from sources
│   │   ├── transform.py      # Business logic transformations
│   │   ├── load.py           # Write to destination
│   │   └── models.py         # Pydantic schemas for this pipeline's data
│   └── [EDIT: other_pipeline]/
├── lib/
│   ├── clients/              # API/database client wrappers
│   ├── validators.py         # Shared data validation
│   └── utils.py              # Date helpers, formatters, etc.
├── tests/
│   ├── fixtures/             # Sample data files for testing
│   └── test_[pipeline].py
├── dags/                     # [EDIT: Airflow DAGs / Prefect flows]
├── config/
│   ├── sources.yaml          # Source system connection configs
│   └── destinations.yaml     # Destination configs
├── pyproject.toml
└── Dockerfile
```

## Conventions

### Pipeline Design
- Every pipeline is **idempotent** — running it twice with the same input produces the same result, no duplicates
- Every pipeline handles **backfills** — can process historical date ranges, not just "today"
- **Extract → Transform → Load** as separate, composable steps — never combine extraction with business logic
- Fail loud. If data quality checks fail, halt the pipeline — don't insert bad data

### Data Quality
- Validate source data at extraction time with Pydantic schemas
- Check row counts: expected ranges, not-empty, no more than X% change from previous run
- Null/missing value handling is explicit per column — never silently drop or fill
- Log data quality metrics for every run (rows in, rows out, rows rejected, processing time)

### Idempotency Patterns
- Use `INSERT ... ON CONFLICT UPDATE` (upsert) for dimension tables
- Use date-partitioned writes with `DELETE partition + INSERT` for fact tables
- Never use auto-increment IDs as business keys — they make idempotency impossible. Use natural keys or deterministic hashes

### Error Handling
- Retry transient errors (network timeouts, rate limits) with exponential backoff
- Don't retry data errors (schema mismatch, validation failure) — alert and halt
- Dead-letter bad records to a separate table/file for investigation — don't block the whole pipeline
- Every error log includes: pipeline name, run ID, step, source record identifier

### Performance
- Process in batches/chunks for large datasets — never load everything into memory at once
- Use [EDIT: Polars / DuckDB] instead of pandas for datasets > 100MB
- Partition output by date for time-series data
- Profile slow pipelines: usually it's the I/O, not the transforms

## Key Commands

```bash
[EDIT: your actual commands]
run:         python -m pipelines.[name].extract && python -m pipelines.[name].transform && python -m pipelines.[name].load
backfill:    python -m pipelines.[name] --start-date 2024-01-01 --end-date 2024-12-31
test:        pytest tests/
lint:        ruff check .
dag-test:    airflow dags test [dag_id] 2024-01-01
```

## Data Sources

| Source | Type | Frequency | Notes |
|--------|------|-----------|-------|
| [EDIT] | API / DB / File | Hourly / Daily | [EDIT: rate limits, auth, quirks] |

## Important Context

[EDIT: Pipeline-specific notes]
- Data volumes and growth rate
- SLAs (when must data be fresh by?)
- Known source system quirks
- Downstream consumers and their requirements

## Do NOT

- Don't use `df.iterrows()` — vectorize or use `apply` at minimum
- Don't hardcode dates — always parameterize for backfill support
- Don't mix extraction logic with transformation logic
- Don't insert raw source data directly — always validate and transform first
- Don't ignore timezone handling — store everything in UTC, convert at presentation layer
- [EDIT: project-specific guardrails]
