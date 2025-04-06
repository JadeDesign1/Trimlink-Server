import { nanoid } from "nanoid";
import LinkSchema from "../model/url.js";

export const GetAllUrl = async (req, res) => {
  try {
    const allUrl = await LinkSchema.find({});
    res.status(200).json({ message: "linked fetched successfully", allUrl });
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).json({ error: "Failed to redirect" });
  }
};

export const GetAuthUserUrl = async (req, res) => {
  const user = req.user;
  try {
    const userUrl = await LinkSchema.find({ createdBy: user._id });
    res.status(200).json({ message: "linked fetched successfully", userUrl });
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).json({ error: "Failed to redirect" });
  }
};

export const getLongUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const selectedUrl = await LinkSchema.findOne({ shortUrl }); // 🔄 Use `findOne` instead of `find`

    if (!selectedUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    console.log("Redirecting to:", selectedUrl.longUrl);
    return res.redirect(selectedUrl.longUrl);
  } catch (error) {
    console.error("Error retrieving URL:", error);
    return res.status(500).json({ error: "Failed to redirect" });
  }
};

export const shortenUrl = async (req, res) => {
  try {
    const { longUrl, userId } = req.body;
    if (!longUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Check if the URL already exists
    let existingUrl = await LinkSchema.findOne({ longUrl });
    if (existingUrl) {
      return res.json({ shortUrl: existingUrl.shortUrl });
    }

    // Generate a unique short code
    let shortCode = nanoid(8); // 8-character unique ID

    // Check if the generated short code already exists
    while (await LinkSchema.findOne({ shortUrl: shortCode })) {
      shortCode = nanoid(8); // Generate a new unique ID
    }

    const urlEntry = { longUrl, shortUrl: shortCode, createdBy: userId };
    console.log(urlEntry);

    // Check if shortUrl is null
    if (!urlEntry.shortUrl) {
      console.error("Error generating short URL: shortUrl is null");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Create new short URL entry
    const newUrl = await LinkSchema.create(urlEntry);
    return res.status(201).json(newUrl);
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUrl = await LinkSchema.findByIdAndDelete({ _id: id });
    if (!deletedUrl) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }
    res.json({ success: true, message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
