const router = require("express").Router();
const session = require("express-session");
const withAuth = require("./../utils/auth.js");
const { User, Blog } = require("../models/index");

router.get("/", async (req, res) => {
  var posts = await Blog.findAll({
    include: User,
  });

  res.render("homepage", {
    posts: posts,
    session: req.session,
  });
});

router.get("/login", async (req, res) => {
  res.render("login", {
    session: req.session,
  });
});

router.get("/register", async (req, res) => {
  res.render("register", {
    session: req.session,
  });
});

router.get("/dashboard", withAuth, async (req, res) => {
  var posts = await Blog.findAll({
    include: User,
    where: {
      user_id: req.session.user_id,
    },
  });
  res.render("dashboard", {
    session: req.session,
    posts: posts,
  });
});

router.get("/add-blog", withAuth, async (req, res) => {
  res.render("add-blog", {
    session: req.session,
  });
});

router.get("/blog/update/:id", withAuth, async (req, res) => {
  var id = req.params.id;
  var post = await Blog.findOne({
    include: User,
    where: {
      user_id: req.session.user_id,
      id: id,
    },
  });
  res.render("update-blog", {
    session: req.session,
    post: post,
  });
});

module.exports = router;
