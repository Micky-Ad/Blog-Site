const router = require("express").Router();
const Blog = require("../../models/Blog");
const User = require("../../models/User");
const withAuth = require("../../utils/auth");

router.post("/add", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.create(req.body);
    res.json({ message: "Blog Post Created" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.errors[0]);
  }
});

router.put("/update/:id", withAuth, async (req, res) => {
  var id = req.params.id;
  console.log(id);
  console.log(req.body);

  try {
    const blogData = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        user_id: req.body.user_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ message: "Blog Post Updated" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.errors[0]);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No Blog found with this id!" });
      return;
    }

    res.status(200).json({
      message: "Blog post deleted.",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
