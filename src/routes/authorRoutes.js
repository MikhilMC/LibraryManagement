const express = require("express");

const authorRouter = express.Router();      // Setting up an router

function router(userNav) {
    // Authors list
    let authors = [
        {
            name: "M. T. Vasudevan Nair",
            language: "Malayalam",
            type: "Novelist",
            img: "mt.jpg"
        },
        {
            name: "Changampuzha Krishna Pillai",
            language: "Malayalam",
            type:"Poet",
            img: "changampuzha.jpeg"
        },
        {
            name: "George R. R. Martin",
            language: "English",
            type: "Novelist",
            img: "George_R._R._Martin.jpg"
        }
    ];
    
    // Router for the Authors page
    authorRouter.get("/", (req, res)=>{
        res.render("authors", {
            userNav,
            title: "Library",
            section: "Authors",
            authors
        })
    });

    // Router for a single author's page
    authorRouter.get("/:id", (req, res)=>{
        let id = req.params.id;
        res.render("author", {
            userNav,
            title: "Library",
            author: authors[id]
        });
    });

    return authorRouter;
}

module.exports = router;