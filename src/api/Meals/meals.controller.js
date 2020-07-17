import MealModel from "./meals.model";

class MealsController {

    async getMealData(ctx) {
        const { _id } = ctx.params
        const res = await MealModel.findOne({ _id });
        ctx.status = 200;
        ctx.body = {
            stat: "ok",
            meal: res,
        };
    }
    async getAllMealData(ctx) {
        const { _id } = ctx.params
        console.log(">>>",_id)
        const res = await MealModel.find();
        ctx.status = 200;
        ctx.body = {
            stat: "ok",
            meal: res,
        };
    }

}

export default new MealsController();
