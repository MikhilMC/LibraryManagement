const express = require("express");

const userRouter = express.Router();

function router(userNav) {
    userRouter.get("/", (req, res)=>{
        res.render("user",
        {
            userNav,
            title: "Library"
        })
    })

    return userRouter;
}

module.exports = router;