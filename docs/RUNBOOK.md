# Runbook

## Service

- Name: `__SERVICE_NAME__`
- Team: `__TEAM_NAME__`
- Owner: `__OWNER_EMAIL__`
- Cost center: `__COST_CENTER__`

## First Checks

```bash
kubectl get rollout __SERVICE_NAME__ -n __SERVICE_NAME__-__ENVIRONMENT__
kubectl get pods -l app.kubernetes.io/name=__SERVICE_NAME__ -n __SERVICE_NAME__-__ENVIRONMENT__
kubectl logs -l app.kubernetes.io/name=__SERVICE_NAME__ -n __SERVICE_NAME__-__ENVIRONMENT__
```

## Health

```bash
curl https://__SERVICE_NAME__.__ENVIRONMENT__.platform.ohanyere.internal/healthz
curl https://__SERVICE_NAME__.__ENVIRONMENT__.platform.ohanyere.internal/readyz
curl https://__SERVICE_NAME__.__ENVIRONMENT__.platform.ohanyere.internal/livez
```

## Rollback

```bash
kubectl argo rollouts undo __SERVICE_NAME__ -n __SERVICE_NAME__-__ENVIRONMENT__
```

Escalate to `__TEAM_NAME__` through `__OWNER_EMAIL__` if rollback does not restore service.
