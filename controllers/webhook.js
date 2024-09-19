module.exports = {
  //  Webhook endpoint to receive messages
  webhook: (req, res) => {
    const { topic, message } = req.body;

    if (!topic || !message) {
      return res.status(400).json({ error: "Topic and message are required" });
    }

    console.log(
      `Received webhook message - Topic: ${topic}, Message: ${message}`
    );

    // Here you can add logic to handle the message, e.g., save it to a database or perform other actions

    res.status(200).json({ message: "Message received successfully" });
  },
  webhookDetails: (req, res) => {
    // Fetch webhook URL from environment variables or use default
    const webhookUrl = process.env.WEBHOOK_URL;

    res.status(200).json({
      message: "Webhook details retrieved successfully",
      webhookUrl: webhookUrl,
    });
  },
};
