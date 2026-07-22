import type { ErrorRequestHandler } from 'express';
import { logger } from '../utils/logger.js';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error({ error }, 'unhandled request error');

  res.status(500).json({
    error: {
      code: 'internal_server_error',
      message: 'An unexpected error occurred'
    }
  });
};
