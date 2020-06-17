const express = require("express");

const signupRouter = express.Router();

function router(nav) {
    signupRouter.get("/", (req, res)=>{
        res.render("signup",
        {
            nav,
            title: "Library"
        });
    });

    return signupRouter;
}

module.exports = router;