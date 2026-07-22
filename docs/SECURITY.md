# Security

## Defaults

- Non-root Docker runtime user
- Read-only container filesystem
- Dropped Linux capabilities
- `allowPrivilegeEscalation: false`
- Kubernetes service account with minimal RBAC
- NetworkPolicy enabled by default
- Helmet HTTP security headers
- Structured logs with authorization and cookie redaction
- CI build signing, scanning, and policy checks delegated to `ohanyere/platform-core`

## Secrets

Do not commit secrets. Use platform-managed secret delivery or IDP-approved secret references.

## Reporting

Security issues should be routed to `mooref068@gmail.com` and the owning team `Developer Experience`.
