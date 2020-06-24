// Accessing the mongoose package
const mongoose = require("mongoose");

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/LibraryApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema definition
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    image: String
});

// Model creation
const BookData = mongoose.model("bookdata", BookSchema);

module.exports = BookData;