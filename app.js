import Koa from 'koa'
import logger from 'koa-logger'
import router from './router'
import bodyParser from 'koa-bodyparser'

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(async(ctx, next) => {
    const start_time = Date.now();
    await next();
    const ms = Date.now() - start_time;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(router.routes());
app.listen(3001);
