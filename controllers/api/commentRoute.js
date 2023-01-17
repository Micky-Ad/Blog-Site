const router = require("express").Router();
const Comment = require("../../models/Comment");
// const User = require("../../models/User");
const withAuth = require("../../utils/auth");

// Adding Comments
router.post("/add", withAuth, async (req, res) => {
  try {
    var data = {
      comment: req.body.comment,
      date: req.body.date,
      user_id: req.session.user_id,
      blog_id: req.body.blog_id,
    };
    const commentData = await Comment.create(data);
    res.json({ message: "Your comment is posted" });
    return;
    // res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error Occured" });
  }
});

module.exports = router;
