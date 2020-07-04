import OrderModel from "./orders.model";

class OrdersController {
    async addOrderData(ctx) {
        const {  } = ctx.request.body;

    }

    async getOrderData(ctx) {
        const res = await OrderModel.find();
        ctx.status = 200;
        ctx.body = {
            stat: "ok",
            Orders: res,
        };
    }

}

export default new OrdersController();
