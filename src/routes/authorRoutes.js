const express = require("express");

const authorRouter = express.Router();      // Setting up an router

const AuthorData = require("../models/AuthorData");

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

function router(userNav) {
    // Router for the Authors page
    authorRouter.get("/", (req, res)=>{
        AuthorData.find()
        .then((authors)=>{
            res.render("authors", {
                userNav,
                title : "Library",
                sub_title : "Authors",
                authors
            })
        })
        .catch(console.log("Error in author collection"));        
    });

    // Router for a single author's page
    authorRouter.get("/:id", (req, res)=>{
        let id = req.params.id;
        AuthorData.findOne({_id:id})
        .then((author)=>{
            res.render("author", {
                userNav,
                title : "Library",
                author
            });
        })
        .catch(console.log("Error in finding the author"));
    });

    return authorRouter;
}

module.exports = router;