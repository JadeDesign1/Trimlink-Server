import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // 👈 allows unauthenticated users
  },
});

const LinkSchema = mongoose.model("Url", urlSchema);

export default LinkSchema;
