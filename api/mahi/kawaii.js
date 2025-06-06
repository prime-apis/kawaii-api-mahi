import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const imagesPath = path.join(process.cwd(), "images.json");

  let images = [];
  try {
    const data = fs.readFileSync(imagesPath, "utf8");
    images = JSON.parse(data).images;
  } catch (error) {
    res.status(500).json({ error: "Failed to load images" });
    return;
  }

  if (!images.length) {
    res.status(500).json({ error: "No images found" });
    return;
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  const url = images[randomIndex];

  res.status(200).json({ url });
}
