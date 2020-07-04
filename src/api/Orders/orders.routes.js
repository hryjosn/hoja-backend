// router.js
import OrderController from "./orders.controller";

module.exports = (Router) => {
    const router = new Router({
        prefix: "/orders",
    });
    const {
        getOrderData,
        addOrderData
    } = OrderController;

    router
        .post("/", addOrderData)
        .get("/:id", getOrderData)


    return router;
};
