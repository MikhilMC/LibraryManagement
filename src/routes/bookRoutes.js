const express = require("express");         // App router

const booksRouter = express.Router();       // Setting up an router

function router(userNav) {
    // Router for the books list
    booksRouter.get("/", (req, res)=>{
        res.render("books",
        {
            userNav,
            section: "Books",
            books
        })
    });
  
    // Router for a single book page
    booksRouter.get("/:id", (req, res)=>{
        const id = req.params.id;
        res.render("book", {
            userNav,
            book: books[id]
        });
    });

    return booksRouter;
}

module.exports = router;