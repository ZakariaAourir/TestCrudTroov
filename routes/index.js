const express = require("express");
const router = express.Router();

const Auth = require("../helper/auth");
const ObjProcess = require("../helper/objectProcess");

router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/register", Auth.getRegister);

router.get("/login", Auth.getLogin);

//add obj
router.post("/homepage/add", Auth.isLoggedIn, ObjProcess.addObj);
// get the objects from Db
router.get("/homepage", Auth.isLoggedIn, ObjProcess.getObj);
// get the edit page
router.get("/homepage/edit/:id", Auth.isLoggedIn, ObjProcess.getEdit);
// edit object
router.post("/homepage/edit/:id", Auth.isLoggedIn, ObjProcess.editObj);
// delete object
router.delete("/homepage/delete/:id", Auth.isLoggedIn, ObjProcess.deleteObj);
// regist - post method
router.post("/register", Auth.postRegister);

// login process - post method
router.post("/login", Auth.loginProcess);

// logout -
router.get("/logout", Auth.logoutProcess);
module.exports = router;
