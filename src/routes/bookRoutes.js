const express = require("express");         // App router

const booksRouter = express.Router();       // Setting up an router

function router(userNav) {
    // Router for the books list
    booksRouter.get("/", (req, res)=>{
        res.render("books",
        {
            userNav,
            title : "Library",
            sub_title : "Books",
            books
        })
    });
  
    // Router for a single book page
    booksRouter.get("/:id", (req, res)=>{
        const id = req.params.id;
        res.render("book", {
            userNav,
            title : "Library",
            book : books[id]
        });
    });

    return booksRouter;
}

module.exports = router;