'use strict';
import userModel from './user.model'

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
class UserController {
    // reg
    async addUserData(ctx, next) {
        const { phoneNumber, password, email } = ctx.request.body;
        if (phoneNumber && email && password) {
            const res = await userModel.addOne({...ctx.request.body});
            ctx.status = 201;
            ctx.body = {
                stat: 'ok',
                id:res.id,
                ...ctx.request.body
            };
        } else {
            ctx.status = 400;
        }
    }
    async getUsersData(ctx, next) {
        const res = await userModel.find();
        console.log("res",res)
        ctx.status = 201;
        ctx.body = {
            stat: 'ok',
        };
    }

    // login check
    async login(ctx, next) {
        const { email } = ctx.request.body;
        const { pw } = ctx.request.body;

        if (email && pw) {
            let userMail = email;
            let userPw = pw;

            const newUserData = userDataList.find((item) => (item.userMail === userMail && item.userPw === userPw));

            if (newUserData) {
                ctx.body = {
                    stat: "ok",
                    result: newUserData
                };
            } else {
                ctx.status = 404;
            }
        } else {
            ctx.status = 404;
        }
    }

    // get User Data
    async getUserData(ctx, next) {
        const userId = parseInt(ctx.params.id);

        if (userId) {
            const newUserDataList = userDataList.find((item) => item.userId === userId);

            if (newUserDataList) {
                ctx.body = {
                    stat: 'ok',
                    result: newUserDataList
                };
            } else {
                ctx.status = 404;
            }
        } else {
            ctx.status = 404;
        }
    }

    // modified User Data
    async modifiedUserData(ctx, next) {
        const userId = parseInt(ctx.params.id);
        const method = ctx.params.method;

        if (userId && method === 'edit') {
            const { name } = ctx.request.body;
            const { email } = ctx.request.body;
            const { interest } = ctx.request.body;

            if (name && email && interest) {
                let userName = name;
                let userMail = email;
                let userInterest = interest;
                const newUserDataList = userDataList.find((item) => item.userId === userId);

                if (newUserDataList) {
                    newUserDataList.userName = userName;
                    newUserDataList.userMail = userMail;
                    newUserDataList.userInterest = userInterest;
                    newUserDataList.modifiedTime = new Date();

                    ctx.body = {
                        stat: 'ok',
                        result: newUserDataList
                    };
                } else {
                    ctx.status = 404;
                }
            } else {
                ctx.status = 404;
            }
        } else {
            ctx.status = 404;
        }
    }

    // delete User Data
    async deleteUserDelData(ctx, next) {
        const userId = parseInt(ctx.params.id);
        const method = ctx.params.method;

        if (userId && method === 'delete') {
            const newUserDataList = userDataList.find((item) => item.userId === userId);

            if (newUserDataList) {
                userDataList = userDataList.filter((item) => item.userId !== userId);

                ctx.status = 204;
                ctx.body = {
                    stat: 'ok',
                    result: userDataList
                };
            } else {
                ctx.status = 404;
            }
        } else {
            ctx.status = 404;
        }
    }
}

export default new UserController();
exports.getOne = ctx => {
    const { userId } = ctx.params;
    const user = db.users.find(user => user.id === userId);
    ctx.assert(user, 404, "The requested user doesn't exist");
    ctx.status = 200;
    ctx.body = user;
};

exports.getAll = async ctx => {
    ctx.status = 200;
    ctx.body = db.users;
};

exports.createOne = async ctx => {
    const { name } = ctx.request.body;
    ctx.assert(name, 400, 'The user info is malformed!');
    const id = generateId();
    const newUser = {
        id,
        name,
        timestamp: Date.now(),
    };
    db.users.push(newUser);
    const createdUser = db.users.find(user => user.id === id);
    ctx.status = 201;
    ctx.body = createdUser;
};