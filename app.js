const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(bodyParser.json());

app.post("/api/gemini", async (req, res) => {
  try {
    const prompt = req.body.question;
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.status(200).json({
      status: "success",
      response: result.response.text(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

module.exports = app;
