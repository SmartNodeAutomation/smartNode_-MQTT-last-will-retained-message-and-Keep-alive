const express = require("express");
const router = express.Router();

var subscriberController = require("../controllers/subscriber");

// Subscriber Home Route.
router.post("/subscribe", subscriberController.subscribe);
// Subscribe to
module.exports = router;
