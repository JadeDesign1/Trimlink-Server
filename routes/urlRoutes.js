import express from "express";
import {
  deleteUrl,
  GetAllUrl,
  getLongUrl,
  shortenUrl,
} from "../controllers/urlController.js";
import { isAuth } from "../auth/auth.js";

const router = express.Router();

router.get("/urls", GetAllUrl);

router.get("/user-urls", isAuth, GetAllUrl);

router.get("/:shortUrl", getLongUrl);

router.post("/shorten-url", shortenUrl);

router.delete("/urls/:id", deleteUrl);

export default router;
