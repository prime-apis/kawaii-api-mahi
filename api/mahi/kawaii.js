import images from '../../../data/images.js';

export default function handler(req, res) {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  res.status(200).json({ url: randomImage });
}
