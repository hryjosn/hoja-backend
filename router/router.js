// router.js
import Router from 'koa-router'
import AuthController from '../Controller/AuthController'

const router = new Router({
    prefix: '/api'
});

router
    .post('/user/reg', AuthController.addUserData)
    .post('/user/login', AuthController.login)
    .get('/user/:id', AuthController.getUserData)
    .put('/user/:id/:method', AuthController.modifiedUserData)
    .delete('/user/:id/:method', AuthController.deleteUserDelData);

export default router;
