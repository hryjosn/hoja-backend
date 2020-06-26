import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import koajwt from "koa-jwt";
import dotenv from "dotenv";

dotenv.config();
const applyApiMiddleware = require("./api");

const app = new Koa();
app.use(
  cors({
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization", "Date"],
    maxAge: 100,
    credentials: true,
    allowMethods: ["GET", "POST", "OPTIONS", "PATCH", "PUT"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Custom-Header",
      "anonymous",
    ],
  })
);
app.use(logger());
app.use(bodyParser());

// Custom 401 handling
app.use(async function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      let errMessage = err.originalError
        ? err.originalError.message
        : err.message;
      ctx.body = {
        error: errMessage,
      };
      ctx.set("X-Status-Reason", errMessage);
    } else {
      throw err;
    }
  });
});
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = "please provide jwt token";
    } else {
      throw err;
    }
  });
});
app.use(
  koajwt({
    secret: process.env.TOKEN_KEY,
  }).unless({
    path: [/\/user\/login/, /\/user/],
  })
);
app.use(async (ctx, next) => {
  const start_time = Date.now();
  await next();
  const ms = Date.now() - start_time;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
applyApiMiddleware(app);
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
