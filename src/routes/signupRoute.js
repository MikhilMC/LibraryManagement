const express = require("express");

const signupRouter = express.Router();      // Setting up an router

const UserData = require("../models/UserData");

function router(nav) {
    // Router for the signup page
    signupRouter.get("/", (req, res)=>{
        res.render("signup",
        {
            nav,
            title : "Library",
            sub_title : "Signup",
            emptyName : "",
            emptyAccountType : "",
            emptyRegisterNumber : ""
        });
    });

    signupRouter.post("/", (req, res)=>{
        if (req.body.name == "" || req.body.userType == undefined || req.body.registerNumber == "") {
            res.render("signup",
            {
                nav,
                title : "Library",
                sub_title : "Signup",
                emptyName : "Please enter your name",
                emptyAccountType : "Please select your account type",
                emptyRegisterNumber : "Please enter your register number"
            });            
        } else {
            console.log(req.body);
            let person = {
                name: req.body.name,
                userType: req.body.userType,
                registerNumber: req.body.registerNumber,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password
            }
            let user = UserData(person);
            user.save();
            setTimeout(() => {
                res.redirect("/login")
            }, 3000);
        }
    });

    return signupRouter;
}

module.exports = router;