// RUN PACKAGES
const express = require("express");     // App Router
const chalk = require("chalk");         // Terminal string styling done right
const path = require("path");           // Node.JS path module
//const bodyparser = require("body-parser");

// SETUP APP
const app = new express();              // app router

const port = process.env.PORT || 3000;  // preconfig your port

// NAVIGATION BAR BEFORE LOGIN
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

// NAVIGATION BAR AFTER LOGIN
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
        link: "/addBook",
        name: "ADD BOOK"
    },
    {
        link: "/addAuthor",
        name: "ADD AUTHOR"
    },
    {
        link: "/",
        name: "SIGN OUT"
    }
];

// INITALIZING OF ROUTER VARIBLES FROM EXPORTED MODULES
// Router for signup page
const signupRouter = require("./src/routes/signupRoute")(nav);
// Router for login page
const loginRouter = require("./src/routes/loginRoute")(nav);
// Router for user home page
const userRouter = require("./src/routes/userRouter")(userNav);
// Router for books page
const booksRouter = require("./src/routes/bookRoutes")(userNav);
// Router for author page
const authorRouter = require("./src/routes/authorRoutes")(userNav);
// Router for adding a book
const addBookRouter = require("./src/routes/addBookRoute")(userNav);

const addAuthorRouter = require("./src/routes/addAuthorRoute")(userNav);

const updateBookRouter = require("./src/routes/updateBookRouter")(userNav);

const updateAuthorRouter = require("./src/routes/updateAuthorRouter")(userNav);

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Static folder for saving client side static files
app.use(express.static("./public"));
// Setting view engine as ejs
app.set("view engine", "ejs");
// Setting up the views folder
app.set("views", path.join(__dirname, "/src/views"));

// ASSIGNING ROUTER VARIABLES FOR EACH ROUTES
app.use("/signup", signupRouter);       // Signup page
app.use("/login", loginRouter);         // Login page
app.use("/user", userRouter);           // User home page
app.use("/books", booksRouter);         // Books page
app.use("/authors", authorRouter);      // Author page
app.use("/addBook", addBookRouter);     // Adding a book to the books page
app.use("/addAuthor", addAuthorRouter);
app.use("/updateBook", updateBookRouter);
app.use("/updateAuthor", updateAuthorRouter);

// Route for the Home page
app.get("/", (req, res)=>{
    res.render("index",
    {
        nav,
        title : "Library"
    });
});

// Setting up the port to handle all the requests and responses
app.listen(port, ()=>{
    console.log("Server is running at port " + chalk.red.bold(port));
});