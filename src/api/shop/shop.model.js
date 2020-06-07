import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
    name: String,
    tags: Array,
    address: String,
    offerDay: Array,
    userId: mongoose.Schema.ObjectId
});
const Shop = mongoose.model("Shop", ShopSchema);

class ShopModel {
    constructor() {
        mongoose
            .connect(
                "mongodb+srv://hojaAdmin:blackozark@cluster0-0o6oo.mongodb.net/test?retryWrites=true&w=majority",
                { useNewUrlParser: true, useUnifiedTopology: true }
            )
            .then((res) => console.log("Connected to db"));
    }

    updateOrCreateOne(params) {
      const userId = params.userId;
      delete params.userId;
      if (userId) {
        return Shop.update({userId}, params, {upsert: true}, (error)=>{
          console.error(error)
        });
      }
    }

    find() {
        return Shop.find();
    }

    findOne(params) {
        return Shop.findOne(params);
    }
}

export default new ShopModel();
