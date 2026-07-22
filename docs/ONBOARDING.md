# Onboarding

## Create A Service

1. Generate a repository from this GitHub Template Repository.
2. Replace all IDP placeholders.
3. Confirm `platform/ownership.yaml` and `platform/catalog-info.yaml`.
4. Run `make install` and `make validate`.
5. Add business routes under `src/routes/`.
6. Request platform review if enabling optional resources.

## Required Metadata

- `__SERVICE_NAME__`
- `__TEAM_NAME__`
- `__OWNER_EMAIL__`
- `__ENVIRONMENT__`
- `__COST_CENTER__`

## Platform Standards

Platform standards are owned in `ohanyere/platform-core`.
Docker Hub registry details are managed by the platform. Developers do not provide a Docker Hub namespace or registry secrets.
Generated services publish images to `kuberpull/<service-name>`.
