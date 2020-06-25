const express = require("express");
const multer = require("multer");
const path = require("path");

const addAuthor = express.Router();

let storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "./public/images");
    },
    filename : (req, file, cb)=>{
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname).toLowerCase());
    }
});

const max_size = 1 * 1024 * 1024;

let upload = multer({
    storage : storage,
    limits : {fileSize : max_size},
    fileFilter : (req, file, cb)=>{
        let fileTypes = /jpeg|jpg|png|gif/;
        let mimeType = fileTypes.test(file.mimetype);
        let extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        } else {
            cb("ERROR : File upload supports only the following types - " + fileTypes)
        }
    }
}).single("image");

const AuthorData = require("../models/AuthorData");

function router(userNav) {
    addAuthor.get("/", (req, res)=>{
        res.render("addAuthor", {
            userNav,
            title : "Library",
            sub_title : "Add Author",
            msg : ""
        })
    })

    addAuthor.post("/add", (req, res)=>{
        upload(req, res, (error)=>{
            if (error instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.log(error);
                res.render("addAuthor", {
                    userNav,
                    title : "Library",
                    sub_title : "Add Author",
                    msg : error.message
                })
            } else if (error) {
            // An unknown error occurred when uploading.
                res.render("addAuthor", {
                    userNav,
                    title : "Library",
                    sub_title : "Add Author",
                    msg : error
                })
            } else {
                if (req.file == undefined) {
                    res.render("addAuthor", {
                        userNav,
                        title : "Library",
                        sub_title : "Add Author",
                        msg : "Error: No File Selected"
                    })
                } else {
                    let item = {
                        name : req.body.name,
                        language : req.body.language,
                        category : req.body.category,
                        image : req.file.filename
                    };
                    let author = AuthorData(item);
                    author.save();
                    setTimeout(() => {
                        res.redirect("/authors");
                    }, 3000);
                }
            }
        });
    });

    return addAuthor;
}

module.exports = router;