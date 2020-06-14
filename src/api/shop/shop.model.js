import mongoose, { Schema } from "mongoose";
import { generateId } from "@util";
const ShopSchema = new Schema({
  name: { type: String, trim: true },
  tags: Array,
  address: String,
  offerDay: Array,
  userId: Schema.ObjectId,
  menuItems: [
    {
      id: { type: Schema.Types.ObjectId },
      name: { type: String, trim: true },
      subtitle: { type: String, trim: true },
      price: { type: String, trim: true },
      photo_url: { type: String, trim: true },
    },
  ],
});
const Shop = mongoose.model("Shop", ShopSchema);

class ShopModel {
  constructor() {
    mongoose.connect(
      "mongodb+srv://hojaAdmin:blackozark@cluster0-0o6oo.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    mongoose.set("useFindAndModify", false);
  }

  updateOrCreateOne(params) {
    const userId = params.userId;
    delete params.userId;
    if (userId) {
      return Shop.findOneAndUpdate(
        { userId },
        params,
        { upsert: true },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  async updateField({ fieldName, shop_id, item }) {
    return Shop.findByIdAndUpdate(
      shop_id,
      { $push: { menuItems: item } },
      { upsert: true, new: true }
    );
  }
  find() {
    return Shop.find();
  }

  findOne(params) {
    return Shop.findOne(params);
  }
}

export default new ShopModel();
