const express = require("express");

const loginRouter = express.Router();

function router(nav) {
    loginRouter.get("/", (req, res)=>{
        res.render("login",
        {
            nav,
            title: "Library",
            dest:"/user"
        });
    });

    return loginRouter;
}

module.exports = router