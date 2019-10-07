const redis = require('redis');
import { logger } from '../../infra/logger'
import { env } from "../env";

// connect to Redis
export const redisClient = redis.createClient(env.REDIS_URI);

redisClient.on('connect', () => {
    logger.info(`Successfull connection to redis on ${env.REDIS_URI}`, {
        scope: "database"
      });
});

redisClient.on('error', err => {
    console.log(`Error: ${err}`);
});
