import MealModel from "./meals.model";

class MealsController {
    async addMealData(ctx) {
        const {} = ctx.request.body;

    }

    async getMealData(ctx) {
        const res = await MealModel.find({ _id: ctx.params.id });
        ctx.status = 200;
        ctx.body = {
            stat: "ok",
            meal: res,
        };
    }

}

export default new MealsController();
