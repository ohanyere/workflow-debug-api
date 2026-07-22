import { describe, expect, it } from 'vitest';
import { healthStatus, livenessStatus, readinessStatus } from '../src/routes/health.js';

describe('health endpoints', () => {
  it('returns health status', () => {
    expect(healthStatus()).toMatchObject({
      status: 'ok'
    });
  });

  it('returns readiness status', () => {
    expect(readinessStatus()).toEqual({
      status: 'ready'
    });
  });

  it('returns liveness status', () => {
    expect(livenessStatus()).toEqual({
      status: 'live'
    });
  });
});
