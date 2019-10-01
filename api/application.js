/**
 * Application file
 * This is the application file, where we return an koajs server with middlewares.
 * 
 * @module Application
 */
import mongoose from '../infra/database/mongoose'
import * as http from 'http'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import { logger } from '../infra/logger'
import router from './routes'

/**
 * Creates and returns a new Koa application.
 * @return {Promise<http.Server>} The configured app.
 */

export async function createServer() {
  logger.debug('Creating server...', { scope: 'startup' })
  const app = new Koa()

  app
    .use(compress())
    .use(cors())
    .use(bodyParser())
    .use(router.routes())

  const server = http.createServer(app.callback())

  server.on('close', () => {
    logger.debug('Server closing, bye!', { scope: 'closing' })
  })

  logger.debug('Server created, ready to listen', { scope: 'startup' })

  return server
}
