import { createServer } from './server.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const app = createServer();

const server = app.listen(env.PORT, () => {
  logger.info(
    {
      port: env.PORT,
      serviceName: env.SERVICE_NAME,
      environment: env.NODE_ENV
    },
    'service started'
  );
});

const shutdown = (signal: NodeJS.Signals) => {
  logger.info({ signal }, 'shutdown requested');
  server.close((error) => {
    if (error) {
      logger.error({ error }, 'shutdown failed');
      process.exit(1);
    }

    logger.info('shutdown complete');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
