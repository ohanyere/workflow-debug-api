import { Router } from 'express';
import { env } from '../config/env.js';

export const healthRouter = Router();

export const healthStatus = () => ({
  status: 'ok',
  service: env.SERVICE_NAME
});

export const readinessStatus = () => ({
  status: 'ready'
});

export const livenessStatus = () => ({
  status: 'live'
});

healthRouter.get('/healthz', (_req, res) => {
  res.status(200).json(healthStatus());
});

healthRouter.get('/livez', (_req, res) => {
  res.status(200).json(livenessStatus());
});

healthRouter.get('/readyz', (_req, res) => {
  res.status(200).json(readinessStatus());
});
