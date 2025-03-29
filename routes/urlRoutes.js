import express from "express";
import { nanoid } from "nanoid";
import LinkSchema from "../model/url.js";

const router = express.Router();

router.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const selectedUrl = await LinkSchema.find({ shorturl: shortUrl });
    const fetchedLongUrl = selectedUrl[0].longurl;
    res
      .status(200)
      .json({ message: "linked fetched successfully", fetchedLongUrl });
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).json({ error: "Failed to redirect" });
  }
});

router.post("/shorten-url", async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: "URL is required" });
  }
  try {
    const shortcode = nanoid(7); // Generate the short code
    const response = await LinkSchema.create({
      longUrl,
      shortUrl: shortcode,
      user: null,
    });

    console.log(response);

    res.status(201).json({ message: "link trimed successfully" }); // Return only the short code
  } catch (error) {
    console.error("Failed to shorten URL:", error.message);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

export default router;
