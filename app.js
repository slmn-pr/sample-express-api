import express from "express";
import client from "prom-client";

const app = express();

const port = 3000;

// Prometheus client
client.collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// APP ROUTES
app.get("/", (req, res) => {
  res.status(200);
  res.json({
    success: true,
    message: "hello world!",
  });
});

app.post("/", (req, res) => {
  res.status(200);
  res.json({
    success: true,
    message: "Send a post request 💣",
  });
});

app.listen(port, () => {
  console.log(`Example API listen for port: ${port}`);
});
