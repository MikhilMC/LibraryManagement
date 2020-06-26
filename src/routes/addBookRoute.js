const express = require("express");
const multer = require("multer");
const path = require("path")

const addBook = express.Router();       // Setting up an router

let storage = multer.diskStorage({
    destination : (req, file, cb)=> {
        cb(null, "./public/images");
    },
    filename : (req, file, cb)=>{
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname).toLowerCase());
    }
});

const max_size = 1 * 1024 * 1024;

const upload = multer({
    storage : storage,
    limits : {fileSize : max_size},
    fileFilter : (req, file, cb)=> {
        let fileTypes = /jpeg|jpg|png|gif/;
        let mimeType = fileTypes.test(file.mimetype);
        let extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        } else {
            cb("ERROR : File upload supports only the following types - " + fileTypes);
        }
    }
}).single("image");

const BookData = require("../models/BookData");

function router(userNav) {
    // Route to the form for adding a home page
    addBook.get("/", (req, res)=>{
        res.render("addBook", {
            userNav,
            title : "Library",
            sub_title : "Add Book",
            msg : ""
        });
    });

    addBook.post("/add", (req, res)=>{
        upload(req, res, (error)=>{
            if (error instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.log(error);
                res.render("addBook", {
                    userNav,
                    title : "Library",
                    sub_title : "Add Book",
                    msg : error.message
                });                
            } else if (error) {
            // An unknown error occurred when uploading.
                res.render("addBook", {
                    userNav,
                    title : "Library",
                    sub_title : "Add Book",
                    msg : error                    
                });
            } else {
                if (req.file == undefined) {
                    res.render("addBook", {
                        userNav,
                        title : "Library",
                        sub_title : "Add Book",
                        msg : "Error: No File Selected"
                    });                    
                } else {
                    let item = {
                        title : req.body.title,
                        author : req.body.author,
                        genre : req.body.genre,
                        image : req.file.filename
                    };
                    let book = BookData(item);
                    book.save();
                    setTimeout(() => {
                        res.redirect("/books");
                    }, 3000);
                }
            }
        });
    });

    return addBook;
}

module.exports = router;