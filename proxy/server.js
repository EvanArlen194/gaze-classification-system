const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const upload = multer();

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8000/");
    res.json(response.data);
  } catch (err) {
    console.error("Error proxying GET / to FastAPI:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/predict", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const formData = new FormData();
    formData.append("file", fileBuffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(
      "http://localhost:8000/predict",
      formData,
      { headers: formData.getHeaders() }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Error proxying to FastAPI:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
