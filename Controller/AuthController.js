// UserController.js
let indexId = 0;
let userDataList = [];

class UserController {
    // reg
    async addUserData(ctx, next) {
        const { name } = ctx.request.body;
        const { email } = ctx.request.body;
        const { pw } = ctx.request.body;

        if (name && email && pw) {
            let userName = name;
            let userMail = email;
            let userPw = pw;

            userDataList.push({
                userId: ++indexId,
                userName: userName,
                userMail: userMail,
                userPw: userPw,
                createTime: new Date(),
            });

            ctx.status = 201;
            ctx.body = {
                stat: 'ok',
                result: indexId
            };

        } else {
            ctx.status = 400;
        }
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
            const newUserDataList = userDataList.find((item) => item.userId === userId );

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
                userDataList = userDataList.filter((item) => item.userId !== userId );

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
