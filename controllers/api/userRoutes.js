const router = require("express").Router();
const User = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.json({ message: "User account created" });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.errors[0]);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // Creating the session for the user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logging out and back to home page
router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
