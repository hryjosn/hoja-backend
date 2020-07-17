import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;
const UserSchema = new mongoose.Schema({
    phone: String,
    password: { type: String, select: false },
    email: String,
    address: String,
    userName: String,
});
const User = mongoose.model("User", UserSchema);

class UserModel {
    constructor() {
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    addOne(params) {
        let newUser = new User(params);
        return newUser.save();
    }

    updateOne(params) {
        const { _id, address, userName } = params
        try {
            return User.updateOne({ _id }, { address, userName })

        }catch (e){
            console.error("error",e)
        }
    }

    find() {
        return User.find();
    }

    findOne(params) {
        return User.findOne(params).populate('-password')
    }
}

export default new UserModel();
