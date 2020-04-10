import Koa from 'koa'
import logger from 'koa-logger'
import router from './api/users/user.routes'
import bodyParser from 'koa-bodyparser'
// let jwt = require('jsonwebtoken');


const index = new Koa();

index.use(logger());
index.use(bodyParser());

// Custom 401 handling
index.use(async function (ctx, next) {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            let errMessage = err.originalError ?
                err.originalError.message :
                err.message
            ctx.body = {
                error: errMessage
            };
            ctx.set("X-Status-Reason", errMessage)
        } else {
            throw err;
        }
    });
});

// index.use(jwt({
//     secret: 'test'
// }).unless({
//     path: [/^\/public/, "/"]
// }));
index.use(async(ctx, next) => {
    const start_time = Date.now();
    await next();
    const ms = Date.now() - start_time;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
index.use(router.routes());
index.listen(3001);
