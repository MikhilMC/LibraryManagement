const express = require("express");

const booksRouter = express.Router();

function router(userNav) {
    var books = [
        {
            title: "Tom & Jerry",
            author: "Joseph Barbera",
            genre: "Cartoon",
            img: "tom.jpg"
        },
        {
            title: "Harry Potter",
            author: "J. K. Rowling",
            genre: "Fantasy",
            img: "harry.jpg"
        },
        {
            title: "Paathummayude Aadu",
            author: "Vaikkom Muhammed Basheer",
            genre: "Drama",
            img: "basheer.png"
        }
    ];
    
    booksRouter.get("/", function(req, res){
        res.render("books",
        {
            userNav,
            title: "Library",
            books
        })
    });
    
    booksRouter.get("/:id", function(req, res){
        const id = req.params.id;
        res.render("book", {
            userNav,
            title: "Library",
            book: books[id]
        });
    });

    return booksRouter;
}

module.exports = router;