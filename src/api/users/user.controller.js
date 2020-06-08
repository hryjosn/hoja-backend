import userModel from "./user.model";
import jwt from "jsonwebtoken";

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
class UserController {
  async addUserData(ctx) {
    const { phoneNumber, password, email } = ctx.request.body;
    if ((!email && !phoneNumber) || !password) {
      return (ctx.body = {
        code: "000002",
        msg: "參數格式錯誤",
      });
    }
    let queryObject = { $or: [{ email }, { phoneNumber }] };
    const result = await userModel.findOne(queryObject);
    if (result) {
      ctx.status = 301;
      return (ctx.body = {
        code: "000001",
        msg: "信箱或手機已被註冊過",
      });
    }
    if (phoneNumber && email && password) {
      const res = await userModel.addOne({ ...ctx.request.body });
      ctx.status = 200;
      ctx.body = {
        stat: "ok",
        id: res.id,
        ...ctx.request.body,
      };
    } else {
      ctx.status = 400;
    }
  }

  async modifiedUserData(ctx) {
    const token = ctx.header.authorization.split(" ")[1];
    try {
      let decoded = jwt.verify(token, process.env.TOKEN_KEY);
      if (decoded["_id"]) {

      }
    } catch (err) {
      console.log("err", err); // bar
    }
  }

  async getUsersData(ctx) {
    const res = await userModel.find();
    ctx.status = 200;
    ctx.body = {
      stat: "ok",
      users: res,
    };
  }

  // login check
  async login(ctx) {
    const { email, phoneNumber, password } = ctx.request.body;
    if ((!email && !phoneNumber) || !password) {
      return (ctx.body = {
        code: "000002",
        data: null,
        msg: "參數格式錯誤",
      });
    }
    let queryObject;
    if (email) {
      queryObject = { email, password };
    } else {
      queryObject = { phoneNumber, password };
    }
    const result = await userModel.findOne(queryObject);
    if (result !== null) {
      const token = jwt.sign(
        {
          name: result.name,
          _id: result._id,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "1d" }
      );
      return (ctx.body = {
        id: result._id,
        token,
        msg: "登錄成功",
      });
    } else {
      return (ctx.body = {
        code: "000002",
        data: null,
        msg: "email,電話,或密碼錯誤",
      });
    }
  }
}

export default new UserController();
