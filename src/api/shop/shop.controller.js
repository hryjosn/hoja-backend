import shopModel from "./shop.model";

const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY;
/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
class ShopController {
    async addShopData(ctx) {
        const { body } = ctx.request;
        const { name, tags, address, offerDay } = ctx.request.body;
        console.log(ctx.request.body)
        let token;
        try {
            token = ctx.header.authorization.split(" ")[1];
        } catch (e) {
            console.error("error:", e)
            return (ctx.body = {
                code: "000000",
                msg: "jwt must be provided",
            });
        }
        if (!name || !tags || !address || !offerDay) {
            return (ctx.body = {
                code: "000003",
                msg: "參數格式錯誤",
            });
        }
        let decoded = jwt.verify(token, tokenKey);

        const result = await shopModel.updateOrCreateOne({ ...body, userId: decoded["_id"] });
        if (result) {
            ctx.status = 200;
            return (ctx.body = {
                code: "000001",
                msg: "新增成功",
            });
        }
    }

    async modifiedShopData(ctx) {
        try {
            const token = ctx.header.authorization.split(" ")[1];

            let decoded = jwt.verify(token, "my_token");
            if (decoded["_id"]) {
            }
        } catch (err) {
            console.log("err", err); // bar
        }
    }

    async getMyShop(ctx) {
        try {
            const token = ctx.header.authorization.split(" ")[1];
            let decoded = jwt.verify(token, tokenKey);
            const res = await shopModel.findOne({ userId: decoded["_id"] });
            ctx.status = 200;
            ctx.body = {
                code: "000001",
                msg: "查詢成功",
                data: res,
            };
        } catch (e) {
            console.error("error:", e)
        }

    }

    async getShopsData(ctx) {
        const res = await shopModel.find();
        ctx.status = 200;
        ctx.body = {
            stat: "ok",
            shops: res,
        };
    }
}

export default new ShopController();
