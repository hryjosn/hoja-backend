import Koa from 'koa'
import logger from 'koa-logger'
import router from './api/users/user.routes'
import bodyParser from 'koa-bodyparser'
// let jwt = require('jsonwebtoken');


const app = new Koa();

app.use(logger());
app.use(bodyParser());

// Custom 401 handling
app.use(async function (ctx, next) {
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

// app.use(jwt({
//     secret: 'test'
// }).unless({
//     path: [/^\/public/, "/"]
// }));
app.use(async(ctx, next) => {
    const start_time = Date.now();
    await next();
    const ms = Date.now() - start_time;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(router.routes());
app.listen(3001);
