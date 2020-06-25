const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const updateAuthor = express.Router();

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "./public/images");
    },
    filename : (req, file, cb)=>{
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname).toLowerCase());
    }
});

const maxSize = 1 *1024 * 1024;

const upload = multer({
    storage : storage,
    limits : { fileSize : maxSize },
    fileFilter : (req, file, cb)=>{
        let fileTypes = /jpeg|jpg|png|gif/
        let mimeType = fileTypes.test(file.mimetype);
        let extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        } else {
            console.log("Error : File upload supports only the following types - " + fileTypes);
        }
    }
}).single("image");

const AuthorData = require("../models/AuthorData");

function router(userNav) {
    updateAuthor.get("/:id", (req, res)=>{
        let id = req.params.id;
        AuthorData.findById(id, (error, author)=>{
            if (error) {
                console.log("Error : " + error);
            }
            else {
                res.render("updateAuthor", {
                    userNav,
                    title : "Library",
                    sub_title : "Update Author",
                    author,
                    msg : ""
                });
            }
        });
    });

    updateAuthor.get("/update/:id&:msg", (req, res)=>{
        let id = req.params.id;
        let msg =req.params.msg;
        AuthorData.findById(id, (error, author)=>{
            if (error) {
                console.log("Error : " + error);
            } else {
                res.render("updateAuthor", {
                    userNav,
                    title : "Library",
                    sub_title : "Update Author",
                    author,
                    msg
                });
            }
        });
    });

    updateAuthor.post("/update/:id", (req, res)=>{
        upload(req, res, (error)=>{
            let id = req.params.id;
            let newItem = {};
            let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
            if (req.body.name != "") newItem.name = req.body.name;
            if (req.body.language != "") newItem.language = req.body.language;
            if (req.body.category != "") newItem.category = req.body.category;
            
            if(error instanceof multer.MulterError) {
                console.log(error);
                res.redirect(fullUrl + "&" + error.message);
            } else if (error) {
                console.log(error);
                res.redirect(fullUrl + "&" + message);
            } else {
                if (req.file ==undefined) {
                    let err = "No file selected";
                    console.log(err);
                } else {
                    newItem.image = req.file.filename;
                }
            }
            if (newItem == {}) {
                res.redirect("/authors");
            } else {
                AuthorData.findByIdAndUpdate(id, newItem, (error, author)=>{
                    if (error) {
                        console.log(error);
                    } else {
                        if (req.file != undefined) {
                            let oldImage = "./public/images/" + author.image
                            fs.unlink(oldImage, (err)=>{
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                            })
                        }
                    }
                })
                setTimeout(() => {
                    res.redirect("/authors")
                }, 3000);
            }
        });
    });

    return updateAuthor;
}

module.exports = router;