/**
 * Index file
 * This is the main file, where all starts.
 * It runs an http server with the configurations loaded in the env.yaml file
 * @module Index
 */

import { createServer } from "./api/application";
import { logger } from "./infra/logger";
import { env } from "./infra/env";

createServer().then(
  app =>
    app.listen(env.PORT, () => {
      const mode = env.NODE_ENV;
      logger.debug(`Server listening on ${env.PORT} in ${mode} mode`, {
        scope: "started"
      });
    }),
  err => {
    logger.error("Error while starting up server", err);
    process.exit(1);
  }
);
