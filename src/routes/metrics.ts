import { Router } from 'express';
import client from 'prom-client';

export const metricsRouter = Router();

client.collectDefaultMetrics();

metricsRouter.get('/metrics', async (_req, res, next) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (error) {
    next(error);
  }
});
