# template-node-api

Production-grade Golden Path Node.js API template for the Internal Developer Platform.

This repository is intended to be used as a GitHub Template Repository. The IDP should replace these placeholders during service creation:

- `__SERVICE_NAME__`
- `__TEAM_NAME__`
- `__OWNER_EMAIL__`
- `__ENVIRONMENT__`
- `__COST_CENTER__`

Platform standards are referenced from `ohanyere/platform-core`, including CI reusable workflows for build/sign, scan, and policy checks.
Docker Hub registry details are managed by the platform. Generated services publish images to `kuberpull/<service-name>`.

## What You Get

- Node.js 20 TypeScript API with Express
- `/healthz`, `/readyz`, `/livez`, and `/metrics`
- Structured JSON logging with request logging
- Environment validation
- Global error handling
- Vitest and Supertest setup
- Production Dockerfile with non-root runtime user
- Argo Rollouts canary deployment by default
- Kubernetes RBAC, service account, quota, limit range, network policy, HPA, PDB, probes, requests, and limits
- Platform ownership, scorecard, lifecycle, FinOps, monitoring, and runbook metadata
- Example-only resource claims for PostgreSQL, Redis, SQS, and S3

## Local Development

```bash
make install
npm run dev
```

The API listens on port `3000` by default.

```bash
curl http://localhost:3000/healthz
curl http://localhost:3000/readyz
curl http://localhost:3000/livez
curl http://localhost:3000/metrics
```

## Validation

```bash
make lint
make test
make build
make validate-k8s
make validate
```

`validate-k8s` renders Kustomize locally with `kubectl kustomize` or `kustomize` when available. It does not require a live Kubernetes cluster.

## Docker

The Docker Hub namespace is a platform default. Developers do not provide registry details for generated services.

```bash
docker build -t kuberpull/__SERVICE_NAME__:local .
docker run --rm -p 3000:3000 kuberpull/__SERVICE_NAME__:local
```

## Deployment

Kubernetes manifests live under `k8s/`.

- `k8s/base` contains the default production guardrails.
- `k8s/overlays/dev` lowers replicas and resource use for development.
- `k8s/overlays/stage` uses a staged canary cadence.
- `k8s/overlays/prod` uses stricter rollout pauses, replica counts, HPA range, PDB, and quota.

## Optional Capabilities

Optional resources are examples only and are not enabled by default:

- `platform/resources/examples/postgres-claim.example.yaml`
- `platform/resources/examples/redis-claim.example.yaml`
- `platform/resources/examples/sqs-claim.example.yaml`
- `platform/resources/examples/s3-claim.example.yaml`

To enable a resource, copy the example into `platform/resources/enabled/` and let the IDP or platform pipeline render it.
