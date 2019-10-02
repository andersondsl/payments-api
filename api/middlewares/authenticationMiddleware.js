import { logger } from "../../infra/logger";

export async function authenticationMiddleware(ctx, next) {
  try {
    const authEncoded = ctx.headers.authorization;
    if (!authEncoded) return ctx.throw(401);

    let decodedAuth = Buffer.from(
      authEncoded.match(/\s(.*)/)[1],
      "base64"
    ).toString("utf8");

    ctx.state.user = decodedAuth.split(":")[0];
    ctx.state.password = decodedAuth.split(":")[1];

    await next();
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.set("WWW-Authenticate", "Basic");
      ctx.body = "Authorization required";
    } else {
      logger.error("Error in request", err);
    }
  }
}
