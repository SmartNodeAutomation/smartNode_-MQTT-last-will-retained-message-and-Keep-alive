const mqttClient = require("../conn/mqttBrokerIntiate"); // Use the exported mqttClient

// Publish API
module.exports = {
  subscribe: async (req, res) => {
    try {
      const { topic, qos } = req.body;

      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      // Default QoS to 0 if not provided
      const qosLevel = qos || 0;

      // Subscribe to the topic
      await mqttClient.subscribe(topic, { qos: qosLevel });

      console.log(`Subscribed to topic: ${topic} with QoS ${qosLevel}`);

      // Respond to the client indicating successful subscription
      res.status(200).json({
        message: `Subscribed to topic: ${topic} with QoS ${qosLevel}`,
      });
    } catch (err) {
      console.error("Failed to subscribe to topic:", err);
      res
        .status(500)
        .json({ error: "Failed to subscribe to topic", details: err });
    }
  },
};
