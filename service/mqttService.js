const EventEmitter = require("events");
const mqtt = require("mqtt");
const axios = require("axios");

class MQTTService extends EventEmitter {
  constructor(host, username, password, webhookUrl) {
    super();
    this.mqttClient = null;
    this.host = host;
    this.username = username;
    this.password = password;
    this.webhookUrl = webhookUrl; // Add webhook URL
  }

  connect() {
    return new Promise((resolve, reject) => {
      // Ensure that the host includes the protocol (mqtt:// or mqtts://)
      if (
        !this.host.startsWith("mqtt://") &&
        !this.host.startsWith("mqtts://")
      ) {
        return reject(new Error("Missing protocol in MQTT_HOST_NAME"));
      }

      this.mqttClient = mqtt.connect(this.host, {
        // keepalive: 6000,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        clientId: "456",
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        username: this.username,
        password: this.password,
        will: {
          topic: "last/will",
          payload: "Client disconnected unexpectedly",
          qos: 1,
          retain: false,
        },
      });

      this.mqttClient.on("error", (err) => {
        console.log("MQTT connection error:", err);
        this.mqttClient.end();
        reject(err);
      });

      this.mqttClient.on("connect", () => {
        console.log("MQTT client connected");
        resolve();
      });

      this.mqttClient.on("message", (topic, message) => {
        this.emit("message", topic, message);
        if (this.webhookUrl) {
          this.forwardMessageToWebhook(topic, message);
        }
      });

      this.mqttClient.on("close", () => {
        console.log("MQTT client disconnected");
      });
    });
  }

  publish(topic, message, options) {
    this.mqttClient.publish(topic, message, options);
  }

  subscribe(topic, options) {
    return new Promise((resolve, reject) => {
      this.mqttClient.subscribe(topic, options, (err, granted) => {
        if (err) {
          reject(err);
        } else {
          resolve(granted);
        }
      });
    });
  }
}

module.exports = MQTTService;
