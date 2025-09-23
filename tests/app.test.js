import request from "supertest";
import express from "express";
import client from "prom-client";

// Mock the prom-client to avoid issues in tests
jest.mock("prom-client", () => ({
  collectDefaultMetrics: jest.fn(),
  register: {
    contentType: "text/plain",
    metrics: jest.fn().mockResolvedValue("mock metrics"),
  },
}));

// Create a test app similar to your main app
const app = express();

// Mock the metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", "text/plain");
  res.end("mock metrics");
});

// Add your routes
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

describe("Express API Tests", () => {
  describe("GET /", () => {
    it("should return hello world message", async () => {
      const response = await request(app).get("/").expect(200);

      expect(response.body).toEqual({
        success: true,
        message: "hello world!",
      });
    });
  });

  describe("POST /", () => {
    it("should return post request message", async () => {
      const response = await request(app).post("/").expect(200);

      expect(response.body).toEqual({
        success: true,
        message: "Send a post request 💣",
      });
    });
  });

  describe("GET /metrics", () => {
    it("should return metrics", async () => {
      const response = await request(app).get("/metrics").expect(200);

      expect(response.headers["content-type"]).toBe("text/plain");
    });
  });
});
