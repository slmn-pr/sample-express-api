import express from "express";

const app = express();

const port = 3000;

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
