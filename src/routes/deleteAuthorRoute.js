const express = require("express");
const fs = require("fs")

const deleteAuthor = express.Router();

const AuthorData = require("../models/AuthorData");

function router(userNav) {
    deleteAuthor.get("/:id", (req, res) => {
        let id = req.params.id;
        AuthorData.findByIdAndDelete(id, (err, author) => {
            if (err) {
                console.log(err);
            } else {
                console.log(author);
                let oldImage = "./public/images/" + author.image;
                fs.unlink(oldImage, (error) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                })
            }
        });
        setTimeout(() => {
            res.redirect("/authors");
        }, 3000);
    });

    return deleteAuthor;
}

module.exports = router;