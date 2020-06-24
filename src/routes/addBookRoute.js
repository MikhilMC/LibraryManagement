const express = require("express");

const addBook = express.Router();       // Setting up an router

function router(userNav) {
    // Route to the form for adding a home page
    addBook.get("/", (req, res)=>{
        res.render("addBook", {
            userNav,
            title : "Library",
            sub_title : "Add Book"
        });
    });

    return addBook;
}

module.exports = router;