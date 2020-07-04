import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;
const OrderSchema = new mongoose.Schema({
    phone: String,
    password: String,
    email: String,
    address: String,
    userName: String,
});
const Order = mongoose.model("Orders", OrderSchema);

class OrdersModel {
    constructor() {
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    addOne(params) {
        let newOrder = new Order(params);
        return newOrder.save();
    }

    updateOne(params) {
        const { _id, address, userName } = params
        try {
            return Order.updateOne({ _id }, { address, userName })

        }catch (e){
            console.error("error",e)
        }
    }

    find() {
        return Order.find();
    }

    findOne(params) {
        return Order.findOne(params);
    }
}

export default new OrdersModel();
