const express = require("express");
const router = express.Router();

var webhookController = require("../controllers/webhook");

// // Publisher Home Route.
// router.get("/", publisherController.getPublisherPage);

router.post("/webhook", webhookController.webhook);
router.get("/webhook-details", webhookController.webhookDetails);

module.exports = router;
