const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");

// connect database
mongoose.connect("mongodb://localhost/userDb", { useNewUrlParser: true });
const db = mongoose.connection;

const index = require("./routes/index");

// init the port
const port = 3000;

// init the app
const app = express();

// express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
);
// Init passport
app.use(passport.initialize());
app.use(passport.session());
// set the view folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// set the static folder
app.set(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// express messages

app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg")[0];
  res.locals.error_msg = req.flash("error_msg")[0];
  res.locals.error = req.flash("error")[0];
  res.locals.user = req.user || null;
  next();
});

// express Validator

app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      const nameSpace = param.split("."),
        root = nameSpace.shift(),
        formParam = root;
      while (nameSpace.length) {
        formParam += "[" + nameSpace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);
// use the app
app.use("/", index);

app.listen(port, () => {
  console.log("server is running on port... " + port);
});
