import type { RequestHandler } from 'express';
import client from 'prom-client';
import { env } from '../config/env.js';

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status', 'service'] as const,
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5]
});

export const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status', 'service'] as const
});

export const metricsMiddleware: RequestHandler = (req, res, next) => {
  const endTimer = httpRequestDuration.startTimer();

  res.on('finish', () => {
    const route = req.route?.path?.toString() ?? req.path;
    const labels = {
      method: req.method,
      route,
      status: String(res.statusCode),
      service: env.SERVICE_NAME
    };

    httpRequestsTotal.inc(labels);
    endTimer(labels);
  });

  next();
};
