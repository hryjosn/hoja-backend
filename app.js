import Koa from 'koa'

const logger = require('koa-logger');
const app = new Koa();
const Router = require('koa-router');

/**
 在此可組合各種 Middleware
 **/
const router = Router();
// Router -> /
router.post('/', async(ctx) => {
    ctx.body = 'Hello Koa2 body';
});
// Router -> /ready
router.get('/ready', async(ctx) => {
    ctx.body = 'Ready Content';
});
app.use(logger());
app.use(async(ctx, next) => {
    const start_time = Date.now();
    await next();
    const ms = Date.now() - start_time;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(router.routes())
app.listen(3001);
