import pino from 'pino';
import { env } from '../config/env.js';

export const logger = pino({
  level: env.LOG_LEVEL,
  base: {
    service: env.SERVICE_NAME,
    team: env.TEAM_NAME
  },
  redact: ['req.headers.authorization', 'req.headers.cookie']
});
