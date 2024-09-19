const express = require("express");
const subscriberRouter = require("./subscriberRoutes");
const publisherRouter = require("./publisherRoutes");
const Webhooks = require("./webhook");
const router = express();

router.use("/subscriber", subscriberRouter);
router.use("/publisher", publisherRouter);
router.use("/message", Webhooks);
module.exports = router;
