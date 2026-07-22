# Disaster Recovery

## Recovery Objectives

- Target RTO: 60 minutes
- Target RPO: service-specific; update when stateful resources are enabled

## Stateless Baseline

This template starts stateless. Recovery is primarily redeployment from source and signed container images.

## Stateful Resources

PostgreSQL, Redis, SQS, and S3 are not enabled by default. If a service enables one of the example claims, update this document with backup, restore, and ownership details.

## Restore Checklist

1. Confirm current incident scope.
2. Identify last healthy image and deployment revision.
3. Roll back with Argo Rollouts if the issue is release-related.
4. Restore stateful dependencies if enabled and approved.
5. Validate `/healthz`, `/readyz`, `/livez`, and business-critical endpoints.
6. Capture post-incident actions in the service tracker.
