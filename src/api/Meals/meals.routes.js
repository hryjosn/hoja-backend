// router.js
import MealsController from "./meals.controller";

module.exports = (Router) => {
    const router = new Router({
        prefix: "/meals",
    });
    const {
        getMealData,
        addMealData
    } = MealsController;

    router
        .post("/", addMealData)
        .get("/:id", getMealData)


    return router;
};
