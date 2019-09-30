 /**
 * Routes file
 * This file describes any external endpoint of our application, calling their respective controllers.
 * 
 * @module router
 */

'use strict'

import Router from 'koa-router';
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = "Payments Api";
});

export default router
