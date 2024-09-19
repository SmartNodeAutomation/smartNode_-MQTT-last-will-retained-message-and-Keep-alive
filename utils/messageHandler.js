const mqttClient = require("../conn/mqttBrokerIntiate"); // Use the exported mqttClient
const axios = require("axios");
function handleMessage(topic, message) {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);

  // Webhook URL
  const webhookUrl = process.env.WEBHOOK_URL;

  // Prepare the payload
  const payload = {
    topic: topic,
    message: message.toString(),
  };

  // Send the message to the webhook endpoint
  axios
    .post(webhookUrl, payload)
    .then((response) => {
      console.log(
        `Message successfully forwarded to webhook: ${response.status}`
      );
    })
    .catch((error) => {
      console.error("Error forwarding message to webhook:", error.message);
    });
}

mqttClient.on("message", (topic, message) => {
  handleMessage(topic, message);
});
