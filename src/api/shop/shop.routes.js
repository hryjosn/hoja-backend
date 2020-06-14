// router.js
import ShopController from "./shop.controller";

module.exports = (Router) => {
    const router = new Router({
        prefix: "/shop",
    });
    const { addShopData, modifiedShopData, getShopsData, getMyShop, addShopMenuItem } = ShopController;

    router
        .post("/", addShopData)
        .post("/modify", modifiedShopData)
        .post("/menu", addShopMenuItem)
        .get("/", getMyShop)
        .get("/all", getShopsData);

    return router;
};
