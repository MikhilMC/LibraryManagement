// Accessing the mongoose package
const mongoose = require("mongoose");

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/LibraryApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch("Error connecting to the database");

// Schema definition
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : String,
    userType : String,
    registerNumber : String,
    email : String,
    phoneNumber : String,
    password : String
});

const UserData = mongoose.model("userdata", UserSchema);

module.exports = UserData;