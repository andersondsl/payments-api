/**
 * Routes file
 * This file describes any external endpoint of our application, calling their respective controllers.
 *
 * @module router
 */

"use strict";
import { index, create, findById } from "./controllers";

import Router from "koa-router";
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Payments Api";
});

router.post("/transaction", create);
router.get("/transaction/", index);
router.get("/transaction/:id", findById);

export default router;
