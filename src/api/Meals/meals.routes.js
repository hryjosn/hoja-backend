// router.js
import MealsController from "./meals.controller";

module.exports = (Router) => {
    const router = new Router({
        prefix: "/meals",
    });
    const {
        getMealData,
        getAllMealData
    } = MealsController;

    router
        .get("/:_id", getMealData)
        .get("/", getAllMealData)


    return router;
};
