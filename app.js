const express = require("express");
const chalk = require("chalk");
const path = require("path");

const app = new express();

const nav = [
    {
        link: "/",
        name: "HOME"
    },
    {
        link: "/login",
        name: "LOGIN"
    },
    {
        link: "/signup",
        name: "SIGNUP"
    }
];

const userNav = [
    {
        link: "/user",
        name: "HOME"
    },
    {
        link: "/books",
        name: "BOOKS"
    },
    {
        link: "/authors",
        name: "AUTHORS"
    },
    {
        link: "/",
        name: "SIGN OUT"
    }
];

const signupRouter = require("./src/routes/signupRoute")(nav);
const loginRouter = require("./src/routes/loginRoute")(nav);
const userRouter = require("./src/routes/userRouter")(userNav);
const booksRouter = require("./src/routes/bookRoutes")(userNav);
const signupRouter = require("./src/routes/signupRoute")(nav);
const loginRouter = require("./src/routes/loginRoute")(nav);

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/books", booksRouter);

app.get("/", (req, res)=>{
    res.render("index",
    {
        nav,
        title: "Library"
    });
});

app.listen(3000, ()=>{
    console.log("Server is running at port " + chalk.red.bold("3000"))
});