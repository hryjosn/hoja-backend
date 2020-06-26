import shopModel from "./shop.model";
import { uploadPhoto } from "@util";

const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY;

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
class ShopController {
  async addShopData(ctx) {
    const { body } = ctx.request;
    const { name, tags, address, offerDay } = ctx.request.body;
    let token = ctx.header.authorization.split(" ")[1];
    if (!name || !tags || !address || !offerDay) {
      return (ctx.body = {
        code: "000003",
        msg: "參數格式錯誤",
      });
    }
    let decoded = jwt.verify(token, tokenKey);

    const result = await shopModel.updateOrCreateOne({
      ...body,
      userId: decoded["_id"],
    });
    if (result) {
      ctx.status = 200;
      return (ctx.body = {
        code: "000001",
        msg: "新增成功",
        result,
      });
    }
  }

  async addShopMenuItem(ctx) {
    const { body } = ctx.req;
    const { name, subtitle, price, shop_id } = body;
    const imageUri = ctx.req.file.path;
    let photo_url;
    try {
      photo_url = await uploadPhoto({
        imageUri,
        title: name,
        description: subtitle,
      });
    } catch (error) {
      console.log("error>>", error);
    }
    if (!name || !subtitle || !price || !photo_url || !shop_id) {
      return (ctx.body = {
        code: "000003",
        msg: "參數格式錯誤",
      });
    }
    try {
      const result = await shopModel.updateField({
        fieldName: "menuItems",
        shop_id,
        item: { name, subtitle, price, photo_url },
      });
      if (result) {
        ctx.status = 200;
        return (ctx.body = {
          code: "000001",
          msg: "新增成功",
          result,
        });
      }
    } catch (e) {
      console.error("e:", e);
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
      console.error("error:", e);
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
