const express = require("express");

const router = express.Router();
const friendshipController = require("../controllers/friendship_controller");

router.post("/toggle", friendshipController.toggleFriendship);

module.exports = router;
