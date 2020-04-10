import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
const User = mongoose.model('User', UserSchema);

class UserModel {
    constructor() {
        mongoose.connect("mongodb+srv://hojaAdmin:blackozark@cluster0-0o6oo.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true })
            .then(res => console.log('Connected to db'));
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
