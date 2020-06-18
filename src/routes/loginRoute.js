const express = require("express");

const loginRouter = express.Router();

function router(nav) {
    loginRouter.get("/", (req, res)=>{
        res.render("login",
        {
            nav,
<<<<<<< HEAD
            title: "Library",
            dest:"/user"
=======
            title: "Library"
>>>>>>> 5432b91041a640e79bb0e9bfc3117564c9e61980
        });
    });

    return loginRouter;
}

module.exports = router