# API

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Basic service identity response |
| GET | `/healthz` | Health endpoint for humans and automation |
| GET | `/readyz` | Readiness endpoint for Kubernetes traffic routing |
| GET | `/livez` | Liveness endpoint for Kubernetes restart decisions |
| GET | `/metrics` | Prometheus metrics endpoint |

## Health Response

```json
{
  "status": "ok",
  "service": "__SERVICE_NAME__"
}
```

Add business APIs under `src/routes/` and register them in `src/server.ts`.
