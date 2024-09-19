const mqttClient = require("../conn/mqttBrokerIntiate"); // Use the exported mqttClient

// Publish API
module.exports = {
  publish: async (req, res) => {
    const { topic, message, option = {} } = req.body;

    if (!topic || !message) {
      return res.status(400).json({ error: "Topic and message are required" });
    }

    // Publish message to MQTT topic
    await mqttClient.publish(topic, message, option, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to publish message", details: err });
      }
      return res
        .status(200)
        .json({ message: "Message published successfully" });
    });
  },
};
