const router = require("express").Router();
const webroutes = require("./webroutes");

router.use("/", webroutes);

module.exports = router;
