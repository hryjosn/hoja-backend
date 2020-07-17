// router.js
import OrderController from "./orders.controller";

module.exports = (Router) => {
    const router = new Router({
        prefix: "/orders",
    });
    const {
        getOrderData,
        addOrderData, getAllOrderData
    } = OrderController;

    router
        .post("/", addOrderData)
        .get("/all", getAllOrderData)
        .get("/:id", getOrderData)


    return router;
};
