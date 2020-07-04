import userModel from "./user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
class UserController {
    async addUserData(ctx) {
        const { phone, password, email } = ctx.request.body;
        console.log(email)
        console.log(phone)
        if ((!email && !phone) || !password) {
            return (ctx.body = {
                code: "000002",
                msg: "參數格式錯誤",
            });
        }
        let queryObject = { $or: [{ email }, { phone }] };
        const result = await userModel.findOne(queryObject);
        console.log(result)

        if (result) {
            ctx.status = 301;
            return (ctx.body = {
                code: "000001",
                msg: "信箱或手機已被註冊過",
            });
        }
        if (phone && email && password) {
            const hashPassword = await bcrypt.hash(password, 10)
            const newObj = { phone, email, password: hashPassword };
            const res = await userModel.addOne(newObj);
            ctx.status = 200;
            ctx.body = {
                status: "ok",
                id: res.id
            };
        } else {
            ctx.status = 400;
        }
    }

    async modifiedUserData(ctx) {
        const { body } = ctx.request;

        const token = ctx.header.authorization.split(" ")[1];
        try {
            let decoded = jwt.verify(token, process.env.TOKEN_KEY);
            const { _id } = decoded
            console.log("_id",_id)
            const user = await userModel.findOne({ _id });

            if (_id) {
                const res = await userModel.updateOne({ _id, ...body });
                console.log("res",res)
                if(res){
                    ctx.body = {
                        stat: "ok",
                        users: res,
                    };
                }

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

    async getCurrentUserData(ctx) {
        const token = ctx.header.authorization?.split(" ")?.[1];
        if (token) {
            let decoded = jwt.verify(token, process.env.TOKEN_KEY);
            const { _id } = decoded
            console.log("_id", _id)
            const res = await userModel.findOne({ _id });
            const user = res
            delete user.password
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    stat: "ok",
                    user
                };
            }
        }

    }

    // login check
    async login(ctx) {
        const { email, phone, password } = ctx.request.body;
        if ((!email && !phone) || !password) {
            ctx.status = 400;
            return (ctx.body = {
                code: "000002",
                data: null,
                msg: "參數格式錯誤",
            });
        }
        let queryObject;
        if (email) {
            queryObject = { email };
        } else {
            queryObject = { phone };
        }
        const result = await userModel.findOne(queryObject);
        const correctUser = await bcrypt.compare(password, result.password)
        if (correctUser) {
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
            ctx.status = 500;
            return (ctx.body = {
                code: "000002",
                data: null,
                msg: "email,電話,或密碼錯誤",
            });
        }
    }

}

export default new UserController();
