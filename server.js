import fs from "fs";
import path from "path";

const imagesPath = path.join(process.cwd(), "images.json");

let images = [];

try {
  const data = fs.readFileSync(imagesPath, "utf-8");
  images = JSON.parse(data).images;
  if (!Array.isArray(images)) throw new Error("Images is not an array");
} catch (err) {
  console.error("Error loading images.json:", err);
  images = [];
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (images.length === 0) {
    res.status(500).json({ error: "No images available" });
    return;
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  const url = images[randomIndex];

  res.status(200).json({ url });
}
