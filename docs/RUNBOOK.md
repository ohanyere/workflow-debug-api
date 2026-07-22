# Runbook

## Service

- Name: `workflow-debug-api`
- Team: `Developer Experience`
- Owner: `mooref068@gmail.com`
- Cost center: `developer-experience`

## First Checks

```bash
kubectl get rollout workflow-debug-api -n workflow-debug-api-dev
kubectl get pods -l app.kubernetes.io/name=workflow-debug-api -n workflow-debug-api-dev
kubectl logs -l app.kubernetes.io/name=workflow-debug-api -n workflow-debug-api-dev
```

## Health

```bash
curl https://workflow-debug-api.dev.platform.ohanyere.internal/healthz
curl https://workflow-debug-api.dev.platform.ohanyere.internal/readyz
curl https://workflow-debug-api.dev.platform.ohanyere.internal/livez
```

## Rollback

```bash
kubectl argo rollouts undo workflow-debug-api -n workflow-debug-api-dev
```

Escalate to `Developer Experience` through `mooref068@gmail.com` if rollback does not restore service.
