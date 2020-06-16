import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
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
  find() {
    return User.find();
  }
  findOne(params) {
    return User.findOne(params);
  }
}

export default new UserModel();
