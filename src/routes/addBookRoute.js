const express = require("express");

const addBook = express.Router();

function router(userNav) {
    addBook.get("/", (req, res)=>{
        res.render("addBook", {
            userNav,
            title: "Library",
        });
    });

    return addBook;
}

module.exports = router;