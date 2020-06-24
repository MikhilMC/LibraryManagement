const express = require("express");         // App router

const booksRouter = express.Router();       // Setting up an router

const BookData = require("../models/BookData");

function router(userNav) {
    // Router for the books list
    booksRouter.get("/", (req, res)=>{
        BookData.find()
        .then((books)=>{
            res.render("books",
            {
                userNav,
                title : "Library",
                sub_title : "Books",
                books
            })
        })
        .catch(console.log("Error in book collection"));
    });
  
    // Router for a single book page
    booksRouter.get("/:id", (req, res)=>{
        const id = req.params.id;
        BookData.findOne({_id:id})
        .then((book)=>{
            res.render("book", {
                userNav,
                title : "Library",
                book
            });           
        })
        .catch(console.log("Error in finding the book"));
    });

    return booksRouter;
}

module.exports = router;