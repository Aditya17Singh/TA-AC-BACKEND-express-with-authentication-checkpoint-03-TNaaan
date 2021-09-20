var express = require("express");
const app = require("../app");
const auth = require("../middleware/auth");
var router = express.Router();
var User = require("../model/User");
var passport = require("passport");
var flash = require("connect-flash");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("users");
});

router.get("/login", (req, res) => {
  var error = req.flash("error")[0];
  console.log("Login page");
  res.render("login", { error });
});

router.post("/login", (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "Email/Password required");
    return res.redirect("/users/login");
  }
  User.findOne({ email }, (err, user) => {
    console.log(req.body, user);
    if (err) return next(err);
    //no user
    if (!user) {
      return res.redirect("/users/login");
    }
    //compare password
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        return res.redirect("/users/login");
      }
      //persisit logged in user info
      req.session.userId = user.id;
      if (user === true) {
        res.redirect("/users/dashboard");
      }
    });
  });
});

router.use(auth.loggedInUser);

router.use("/dashboard", (req, res, next) => {
  let userId = req.session.userId;
  User.findById(userId, (err, user) => {
    if (err) return next(err);
    res.render("dashboard", { user });
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/users/login");
});

module.exports = router;
