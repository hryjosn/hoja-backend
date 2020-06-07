// router.js
import ShopController from "./shop.controller";

module.exports = (Router) => {
  const router = new Router({
    prefix: "/shop",
  });
  const { addShopData, modifiedShopData, getShopsData,getMyShop } = ShopController;

  router
    .post("/", addShopData)
    .post("/modify", modifiedShopData)
    .get("/", getMyShop)
    .get("/all", getShopsData);

  return router;
};
