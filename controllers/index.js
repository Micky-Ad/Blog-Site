const router = require("express").Router();
const webroutes = require("./webroutes");

const apiRoutes = require("./api");

router.use("/", webroutes);
router.use("/api", apiRoutes);

module.exports = router;
