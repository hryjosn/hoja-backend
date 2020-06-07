// router.js
import AuthController from "./user.controller";

module.exports = (Router) => {
  const router = new Router({
    prefix: "/user",
  });
  const {
    addUserData,
    login,
    getUserData,
    modifiedUserData,
    deleteUserDelData,
    getUsersData,
  } = AuthController;

  router
    .post("/", addUserData)
    .post("/modify", modifiedUserData)
    .post("/login", login)
    .get("/users", getUsersData);

  return router;
};
