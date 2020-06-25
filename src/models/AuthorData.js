// Accessing the mongoose package
const mongoose = require("mongoose");

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/LibraryApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch("Error connecting to the database");

// Schema definition
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name : String,
    language : String,
    category : String,
    image : String
});

const AuthorData = mongoose.model("authordata", AuthorSchema);

module.exports = AuthorData;