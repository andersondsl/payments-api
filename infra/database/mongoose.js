/**
 * mongoose file.
 * This file connects and load all models to a mongo database.
 * 
 * @module mongoose
 */

import mongoose from 'mongoose'
import { logger } from '../logger'
import { env } from '../env'

mongoose.connect(env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  logger.info(`Successful connection to mongo on ${env.MONGO_URI}`, { scope: 'database' })

}).catch(err => {
    logger.error(`Error while connectting to mongo on ${env.MONGO_URI}`, err, { scope: 'database' })
    process.exit(1)
})

export default mongoose
