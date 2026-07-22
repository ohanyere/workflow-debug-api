import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/error-handler.js';
import { metricsMiddleware } from './middleware/metrics.js';
import { notFoundHandler } from './middleware/not-found.js';
import { requestLogger } from './middleware/request-logger.js';
import { healthRouter } from './routes/health.js';
import { metricsRouter } from './routes/metrics.js';

export const createServer = () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(requestLogger);
  app.use(metricsMiddleware);

  app.get('/', (_req, res) => {
    res.status(200).json({
      service: process.env.SERVICE_NAME ?? '__SERVICE_NAME__',
      status: 'ok'
    });
  });

  app.use(healthRouter);
  app.use(metricsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
