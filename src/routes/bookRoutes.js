const express = require("express");

const booksRouter = express.Router();

booksRouter.use(express.urlencoded());

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
    
    booksRouter.get("/", (req, res)=>{
        res.render("books",
        {
            userNav,
            title: "Library",
            section: "Books",
            books
        })
    });

    booksRouter.post("/", (req, res)=>{
        let title = req.body.title;
        let author = req.body.author;
        let genre = req.body.genre;
        let img = req.files.img;
        console.log(title, author, genre, img);
    });

    const addBookRouter = require("./addBookRoute")(userNav);

    booksRouter.use("/addBook", addBookRouter);
    
    booksRouter.get("/:id", (req, res)=>{
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