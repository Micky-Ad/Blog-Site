const router = require("express").Router();
const session = require("express-session");
const withAuth = require("./../utils/auth.js");

router.get("/", async (req, res) => {
  res.render("homepage");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/dashboard", withAuth, async (req, res) => {
  res.render("dashboard", {
    session: req.session,
  });
});

router.get("/add-blog", withAuth, async (req, res) => {
  res.render("add-blog", {
    session: req.session,
  });
});

module.exports = router;
