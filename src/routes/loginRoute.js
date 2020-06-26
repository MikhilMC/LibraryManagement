const express = require("express");

const loginRouter = express.Router();       // Setting up an router

const UserData = require("../models/UserData");

function router(nav) {
    // Route for the login page
    loginRouter.get("/", (req, res)=>{
        res.render("login",
        {
            nav,
            title : "Library",
            sub_title : "Login",
            loginError : ""
        });
    });

    loginRouter.post("/", (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        UserData.findOne({email}, (error, user) => {
            if (error) {
                console.log(error);
            } else {
                if (user == null) {
                    res.render("login",
                    {
                        nav,
                        title : "Library",
                        sub_title : "Login",
                        loginError : "Incorrect email and password"
                    });
                } else {
                    if (password != user.password){
                        res.render("login",
                        {
                            nav,
                            title : "Library",
                            sub_title : "Login",
                            loginError : "Email is correct, but password is incorrect"
                        });
                    } else {
                        if (user.userType == "admin") {
                            res.redirect("/user");
                        } else {
                            let userNav = [ 
                                { link: "/user", name: "HOME" },
                                { link: "/books", name: "BOOKS" },
                                { link: "/authors", name: "AUTHORS" },
                                { link: "/", name: "SIGN OUT" }
                            ];
                            res.render("user", {
                                userNav,
                                title : "Library"
                            })
                        }
                    }
                }
            }
        });
    });

    return loginRouter;
}

module.exports = router