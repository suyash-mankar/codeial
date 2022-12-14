const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);

// whenever any request comes with users, it requires/goes-to users routes
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/likes", require("./likes"));
router.use("/friendship", require("./friendship"));

router.use("/api", require("./api"));

module.exports = router;
