# Deployment

CI is defined in `.github/workflows/ci.yaml` and calls platform standards from `ohanyere/platform-core`:

- `ohanyere/platform-core/.github/workflows/reusable-build-sign.yaml@main`
- `ohanyere/platform-core/.github/workflows/reusable-scan.yaml@main`
- `ohanyere/platform-core/.github/workflows/reusable-policy-check.yaml@main`

Docker Hub registry details are managed by the platform. Developers do not provide a Docker Hub namespace or registry configuration.
Generated services publish images to `kuberpull/<service-name>`.

## Environments

- `dev`: fast promotion, lower resources
- `stage`: release candidate validation
- `prod`: guarded canary rollout

Render manifests locally:

```bash
make validate-k8s
```
