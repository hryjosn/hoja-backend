import OrderModel from "./orders.model";

class OrdersController {
    async addOrderData(ctx) {
        const { deliveryTime } = ctx.request.body;
        const params = { ...ctx.request.body, deliveryTime: new Date(deliveryTime), createdAt: new Date() }
        const res = await OrderModel.addOne(params);
        ctx.status = 200;
        ctx.body = {
            stat: "insert success",
            order: res,
        };
    }

    async getOrderData(ctx) {
        const _id = ctx.params.id
        const res = await OrderModel.find({ _id });
        ctx.status = 200;
        ctx.body = {
            stat: "ok",
            order: res,
        };
    }
    async getAllOrderData(ctx) {
        const res = await OrderModel.find();
        ctx.status = 200;
        ctx.body = {
            stat: "ok",
            allOrders: res,
        };
    }

}

export default new OrdersController();
