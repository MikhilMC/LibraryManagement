const express = require("express");

const authorRouter = express.Router();

function router(userNav) {
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
    
    authorRouter.get("/", (req, res)=>{
        res.render("authors", {
            userNav,
            title: "Library",
            section: "Authors",
            authors
        })
    });

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