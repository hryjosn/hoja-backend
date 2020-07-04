import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;
const MealSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    price: { type: String, trim: true },
    photo_url: { type: String, trim: true },
    shop_id: mongoose.ObjectId
});
const Meal = mongoose.model("Meals", MealSchema);

class MealsModel {
    constructor() {
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    addOne(params) {
        console.log("params>>>",params)
        let newMeal = new Meal(params);
        return newMeal.save();
    }

    updateOne(params) {
        const { _id, address, userName } = params
        try {
            return Meal.updateOne({ _id }, { address, userName })

        } catch (e) {
            console.error("error", e)
        }
    }

    find() {
        return Meal.find();
    }

    findOne(params) {
        return Meal.findOne(params);
    }
}

export default new MealsModel();
