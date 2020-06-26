const express = require("express");
const fs = require("fs")

const deleteBook = express.Router();

const BookData = require("../models/BookData");

function router(userNav) {
    deleteBook.get("/:id", (req, res) => {
        let id = req.params.id;
        BookData.findByIdAndDelete(id, (err, book) => {
            if (err) {
                console.log(err);
            } else {
                console.log(book);
                let oldImage = "./public/images/" + book.image;
                fs.unlink(oldImage, (error) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                })
            }
        });
        setTimeout(() => {
            res.redirect("/books");
        }, 3000);
    });

    return deleteBook;
}

module.exports = router;