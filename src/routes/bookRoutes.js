const express = require("express");
const multer = require("multer");
var bodyParser = require('body-parser')
const path = require("path");

const booksRouter = express.Router();

const upload = {
    storage: multer.diskStorage({
        destination: (req, file, next)=>{
            next(null, "public/images/");
        },
        filename: (req, file, next)=>{
            console.log(file);
            const ext = path.extname(file.originalname).toLowerCase();
            next(null, file.fieldname + "-" + Date.now() + "." + ext);
        }
    }),
    fileFilter: (req, file, next)=>{
        if(!file) {
            next();
        }
        const image = file.mimetype.startsWith('image');
        if (image) {
            console.log('Photo uploaded.');
            next(null, true);
        } else {
            console.log('File not supported.');
            return next();
        }
    }
}

var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

    booksRouter.post("/", urlencodedParser, multer(upload).single("img"), (req, res)=>{
        let title = req.body.title;
        let author = req.body.author;
        let genre = req.body.genre;
        let img = req.file.originalname;
        // console.log(title, author, genre, img);
        let newBook = {title, author, genre, img};
        books.push(newBook);
        res.render("books",
        {
            userNav,
            title: "Library",
            section: "Books",
            books
        })
    });
    
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