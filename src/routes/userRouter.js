const express = require("express");

const userRouter = express.Router();        // Setting up an router

function router(userNav) {
    // Route for the User home page
    userRouter.get("/", (req, res)=>{
        res.render("user",
        {
            userNav
        })
    })

    return userRouter;
}

module.exports = router;