// router.js
import Router from 'koa-router'
import AuthController from './user.controller'

const router = new Router({
    prefix: '/api'
});
const { addUserData, login, getUserData, modifiedUserData, deleteUserDelData,getUsersData } = AuthController;
router
    .post('/user', addUserData)
    // .post('/user/login', login)
    .get('/users', getUsersData)
    // .put('/user/:id/:method', modifiedUserData)
    // .delete('/user/:id/:method', deleteUserDelData);

export default router;
