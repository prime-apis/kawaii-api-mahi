import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

let images = [];

// Load images.json once at startup
const imagesPath = path.join(process.cwd(), "images.json");

try {
  const data = fs.readFileSync(imagesPath, "utf-8");
  images = JSON.parse(data).images;
  if (!Array.isArray(images)) throw new Error("Images is not an array");
} catch (err) {
  console.error("Error loading images.json:", err);
  images = [];
}

app.get("/api/mahi/kawaii", (req, res) => {
  if (images.length === 0) {
    return res.status(500).json({ error: "No images available" });
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  const url = images[randomIndex];
  res.json({ url });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
