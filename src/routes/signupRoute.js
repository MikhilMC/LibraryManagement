const express = require("express");

const signupRouter = express.Router();      // Setting up an router

function router(nav) {
    // Router for the signup page
    signupRouter.get("/", (req, res)=>{
        res.render("signup",
        {
            nav
        });
    });

    return signupRouter;
}

module.exports = router;