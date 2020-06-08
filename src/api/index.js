const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

// const { apiVersion } = require('../config').server;
const baseName = path.basename(__filename);

function applyApiMiddleware(app) {
  const router = new Router({
    prefix: `/api`,
  });
  // fs.readdirSync(__dirname).forEach((folderName) => {
  //   if (folderName !== "index.js") {
  //     // console.log(path.join(__dirname, folderName));
  //   }
  // });
  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== baseName && file.indexOf(".map") === -1)
    .forEach((file) => {
      const api = require(path.join(__dirname, file))(Router);
      router.use(api.routes());
    });

  app.use(router.routes()).use(router.allowedMethods());
}

module.exports = applyApiMiddleware;
