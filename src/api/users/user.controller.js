import userModel from './user.model'

const jwt = require('jsonwebtoken');

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
class UserController {
    // reg
    async addUserData(ctx, next) {
        const { phoneNumber, password, email } = ctx.request.body;
        if (phoneNumber && email && password) {
            const res = await userModel.addOne({ ...ctx.request.body });
            ctx.status = 200;
            ctx.body = {
                stat: 'ok',
                id: res.id,
                ...ctx.request.body
            };
        } else {
            ctx.status = 400;
        }
    }

    async getUsersData(ctx, next) {
        const res = await userModel.find();
        ctx.status = 200;
        ctx.body = {
            stat: 'ok',
            users: res
        };
    }

    // login check
    async login(ctx, next) {
        const { email, phoneNumber, password } = ctx.request.body;
        if ((!email && !phoneNumber) || !password) {
            return ctx.body = {
                code: '000002',
                data: null,
                msg: '參數格式錯誤'
            }
        }
        let queryObject;
        if (email) {
            queryObject = { email, password }
        } else {
            queryObject = { phoneNumber, password }
        }
        const result = await userModel.findOne(queryObject);
        if (result !== null) {
            const token = jwt.sign({
                name: result.name,
                _id: result._id
            }, 'my_token', { expiresIn: '1d' });
            return ctx.body = {
                id: result._id,
                token,
                msg: '登錄成功'
            }
        } else {
            return ctx.body = {
                code: '000002',
                data: null,
                msg: 'email,電話,或密碼錯誤'
            }
        }
    }

}

export default new UserController();
