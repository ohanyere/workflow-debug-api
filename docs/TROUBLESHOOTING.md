# Troubleshooting

## Local Install Fails

```bash
npm cache verify
npm ci
```

Confirm Node.js is version 20 or newer:

```bash
node --version
```

## Pod Not Ready

```bash
kubectl describe pod -l app.kubernetes.io/name=__SERVICE_NAME__ -n __SERVICE_NAME__-__ENVIRONMENT__
kubectl logs -l app.kubernetes.io/name=__SERVICE_NAME__ -n __SERVICE_NAME__-__ENVIRONMENT__
```

Check `/readyz` and any downstream dependencies added by the service team.

## Canary Stalled

```bash
kubectl argo rollouts get rollout __SERVICE_NAME__ -n __SERVICE_NAME__-__ENVIRONMENT__
```

Review recent errors, HPA events, and Prometheus alerts before promoting or aborting.
