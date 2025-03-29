import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Optional
  createdAt: { type: Date, default: Date.now },
});

const LinkSchema = mongoose.model("Url", urlSchema);

export default LinkSchema;
