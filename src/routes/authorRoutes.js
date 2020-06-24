const express = require("express");

const authorRouter = express.Router();      // Setting up an router

function router(userNav) {
    // Router for the Authors page
    authorRouter.get("/", (req, res)=>{
        res.render("authors", {
            userNav,
            title : "Library",
            sub_title : "Authors",
            authors
        })
    });

    // Router for a single author's page
    authorRouter.get("/:id", (req, res)=>{
        let id = req.params.id;
        res.render("author", {
            userNav,
            title : "Library",
            author : authors[id]
        });
    });

    return authorRouter;
}

module.exports = router;