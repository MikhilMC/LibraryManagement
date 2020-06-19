const express = require("express");

const loginRouter = express.Router();       // Setting up an router

function router(nav) {
    // Route for the login page
    loginRouter.get("/", (req, res)=>{
        res.render("login",
        {
            nav,
            dest:"/user"
        });
    });

    return loginRouter;
}

module.exports = router