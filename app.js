const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with unique name
  },
});

const upload = multer({ storage });

// Function to create a delay using a Promise
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Endpoint to upload an image with a 15-second delay
app.post("/upload", upload.single("uploadedFile"), async (req, res) => {
  if (req.file) {
    await delay(15000); // 15-second delay
    res.send({ fileName: req.file.filename });
  } else {
    res.status(400).send("No file uploaded");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
