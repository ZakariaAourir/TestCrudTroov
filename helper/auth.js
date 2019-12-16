const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Models = require("../models/models");

exports.getRegister = (req, res, next) => {
  res.render("register");
};

exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.postRegister = (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody("name", "First Name field is required").notEmpty();
  req.checkBody("email", "Email field is required").notEmpty();
  req.checkBody("email", "Email is not valide").isEmail();
  req.checkBody("username", "Username field is required").notEmpty();
  req.checkBody("password", "Password field is required").notEmpty();
  req
    .checkBody("password2", "Password does not match")
    .equals(req.body.password);

  let errors = req.validationErrors();
  console.log("Validation errors", errors);
  if (errors) {
    res.render("register", {
      errors: errors
    });
  } else {
    const newUser = new Models({
      name: name,
      username: username,
      email: email,
      password: password
    });

    Models.registerUser(newUser, (err, user) => {
      if (err) throw err;
      req.flash("success_msg", "You are registered and you can login");
      res.redirect("/login");
      console.log("succed");
    });
  }
};

// local Strategy

passport.use(
  new LocalStrategy((username, password, done) => {
    Models.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "User Not Found" });
      }
      Models.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "wrong Password" });
        }
      });
    });
  })
);

//serialise

passport.serializeUser((user, done) => {
  done(null, user.id);
});
// deserialise

passport.deserializeUser((id, done) => {
  Models.getUserById(id, (err, user) => {
    done(err, user);
  });
});

exports.loginProcess = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/homepage",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
  console.log("you r logged in");
};

// acces controle
exports.isLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
  req.flash("error_msg", "you are not autorized");
};

exports.logoutProcess = (req, res, next) => {
  req.logout();
  req.flash("success_msg", "you are logged out");
  res.redirect("/login");
};
