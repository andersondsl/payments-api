import { logger } from '../../infra/logger'

export async function requestLogger(ctx, next) {
    const msg = `${ctx.request.ip} ${ctx.request.origin} ${ctx.request.method} ${ctx.request.path}`
    logger.debug(msg, { scope: 'request' })
    await next()
}