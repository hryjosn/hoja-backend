// router.js
import AuthController from "./user.controller";

module.exports = (Router) => {
  const router = new Router({
    prefix: "/user",
  });
  const {
    addUserData,
    login,
    getCurrentUserData,
    modifiedUserData,
    deleteUserDelData,
    getUsersData,
    test
  } = AuthController;

  router
    .post("/", addUserData)
    .patch("/", modifiedUserData)
    .post("/login", login)
    .get("/users", getUsersData)
    .get("/info", getCurrentUserData)


  return router;
};
