/**
 * Application file
 * This is the application file, where we return an koajs server with middlewares.
 *
 * @module Application
 */
import mongoose from "../infra/database/mongoose";
import { redisClient } from "../infra/redis/redis";

import * as http from "http";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import { logger } from "../infra/logger";
import router from "./routes";
import { authenticationMiddleware } from "./middlewares/authenticationMiddleware";
//import { requestLogger } from "./middlewares/logMiddleware";
const monitor = require("koa-monitor");

/**
 * Creates and returns a new Koa application.
 * @return {Promise<http.Server>} The configured app.
 */

export async function createServer() {
  logger.debug("Creating server...", { scope: "startup" });
  const app = new Koa();
  const server = http.createServer(app.callback());

  app.use(monitor(server, { path: "/status", statusHtmlPage: "index.html" }));

  app
    .use(compress())
    .use(cors())
    //  Using this logger, seen to make a high call of the console api, increasing memory usage and response time.
    // .use(requestLogger)
    .use(authenticationMiddleware)
    .use(bodyParser())
    .use(router.routes());

  server.on("close", () => {
    mongoose.connection.close();
    logger.debug("Server closing, bye!", { scope: "closing" });
  });

  logger.debug("Server created, ready to listen", { scope: "startup" });

  return server;
}
