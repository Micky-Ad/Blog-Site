const router = require("express").Router();
const session = require("express-session");
const withAuth = require("./../utils/auth.js");
const { User, Blog, Comment } = require("../models/index");

// Home route
router.get("/", async (req, res) => {
  var posts = await Blog.findAll({
    include: [User, Comment, User],
  });
  // console.log(posts[0].comments);
  res.render("homepage", {
    posts: posts,
    session: req.session,
  });
});

// Login route
router.get("/login", async (req, res) => {
  res.render("login", {
    session: req.session,
  });
});

// Register route
router.get("/register", async (req, res) => {
  res.render("register", {
    session: req.session,
  });
});

// Dashboard route
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

// Adding blog route
router.get("/add-blog", withAuth, async (req, res) => {
  res.render("add-blog", {
    session: req.session,
  });
});

// Updating blog route
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

// Adding comment route
router.get("/blog/comment/:id", withAuth, async (req, res) => {
  var id = req.params.id;
  var post = await Blog.findAll({
    include: User,
    where: {
      id: id,
    },
  });
  res.render("comment", {
    session: req.session,
    posts: post,
  });
});

module.exports = router;
