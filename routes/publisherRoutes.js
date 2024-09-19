const express = require("express");
const router = express.Router();

var publisherController = require("../controllers/publisher");

// // Publisher Home Route.
// router.get("/", publisherController.getPublisherPage);

router.post("/pubilsh", publisherController.publish);

module.exports = router;
