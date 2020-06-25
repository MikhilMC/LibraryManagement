const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const updateBook = express.Router();

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "./public/images");
    },
    filename : (req, file, cb)=>{
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname).toLowerCase());
    }
});

const maxSize = 1 * 1024 * 1024

const upload = multer({
    storage : storage,
    limits : { fileSize : maxSize },
    fileFilter : (req, file, cb)=>{
        let fileTypes = /jpeg|jpg|png|gif/;
        let mimeType = fileTypes.test(file.mimetype);
        let extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        } else {
            console.log("Error : File upload supports only the following types - " + fileTypes);
        }
    }
}).single("image");

const BookData = require("../models/BookData");

function router(userNav) {
    updateBook.get("/:id", (req, res)=>{
        let id = req.params.id;
        BookData.findById(id, (err, book)=>{
            if(err) {
                console.log("Error : " + err);
            } else {
                res.render("updateBook", {
                    userNav,
                    title : "Library",
                    sub_title : "Update Book",
                    book,
                    msg : ""
                });
            }
        })
    });

    updateBook.get("/update/:id&:msg",(req, res)=>{
        let id = req.params.id;
        let msg = req.params.msg;
        BookData.findById(id, (err, book)=>{
            if(err) {
                console.log("Error : " + err);
            } else {
                res.render("updateBook", {
                    userNav,
                    title : "Library",
                    sub_title : "Update Book",
                    book,
                    msg
                });
            }
        })
    });

    updateBook.post("/update/:id", (req, res)=>{
        upload(req, res, (error)=>{
            let id = req.params.id;
            let newItem = {};
            let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            if (req.body.title != "") newItem.title = req.body.title;
            if (req.body.author != "") newItem.author = req.body.author;
            if (req.body.genre != "") newItem.genre = req.body.genre;

            if (error instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.log(error);
                res.redirect(fullUrl + "&" + error.message);
            } else if (error) {
            // An unknown error occurred when uploading.
                console.log(error);
                res.redirect(fullUrl + "&" + error);
            } else {
                if (req.file == undefined) {
                    let err = "No File Selected"
                    console.log(err)
                } else {
                    newItem.image = req.file.filename;
                }
            }
            if (newItem == {}) {
                console.log(1)
                res.redirect("/books");
            } else {
                BookData.findByIdAndUpdate(id, newItem, (error, book)=>{
                    if (error) {
                        console.log(error);
                    } else {
                        if (req.file != undefined) {
                            let oldImage = "./public/images/" + book.image;
                            fs.unlink(oldImage, (err)=>{
                                if(err) {
                                    console.log(err);
                                    return;
                                }
                            })
                        }
                    }
                });
                setTimeout(() => {
                    res.redirect("/books");
                }, 3000);
            }
        });
    });

    return updateBook;
}

module.exports = router;