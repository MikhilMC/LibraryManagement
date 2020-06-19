const express = require("express");         // App router
const multer = require("multer");           // File sorting middleware
var bodyParser = require('body-parser')     // Cleans our req.body
const path = require("path");

const booksRouter = express.Router();       // Setting up an router

//UPLOAD: to get file photos to temp server storage
const upload = {
    storage: multer.diskStorage({
        // Setup where the user's file will go
        destination: (req, file, next)=>{
            next(null, "public/images/");
        },
        // Then give the file a unique name
        filename: (req, file, next)=>{
            console.log(file);
            const ext = path.extname(file.originalname).toLowerCase();
            next(null, file.fieldname + "-" + Date.now() + "." + ext);
        }
    }),
    // A means of ensuring only images are uploaded. 
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

var urlencodedParser = bodyParser.urlencoded({ extended: false })   // Handle body requests

function router(userNav) {
    // Books list
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
    
    // Router for the books list
    booksRouter.get("/", (req, res)=>{
        res.render("books",
        {
            userNav,
            title: "Library",
            section: "Books",
            books
        })
    });

    // Router for reading the values from the form, uploading the image,
    // and displaying a new books page
    booksRouter.post("/", urlencodedParser, multer(upload).single("img"), (req, res)=>{
        let title = req.body.title;
        let author = req.body.author;
        let genre = req.body.genre;
        let img = req.file.originalname;
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
    
    // Router for a single book page
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