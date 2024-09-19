const MQTTService = require("../service/mqttService");
require("dotenv").config();
const EventEmitter = require("events");
const mqtt = require("mqtt");

const mqttClient = new MQTTService(
  process.env.MQTT_HOST_NAME,
  process.env.MQTT_USERNAME, // Pass username from environment variables
  process.env.MQTT_PASSWORD // Pass password from environment variables
);

// Connecting to the MQTT broker with error handling
mqttClient
  .connect()
  .then(() => {
    console.log("MQTT connected successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to MQTT broker:", error);
  });

module.exports = mqttClient;
