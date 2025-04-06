import express from "express";
import {
  allUser,
  GetCurrentUser,
  Login,
  Register,
} from "../controllers/userController.js";
import { isAuth } from "../auth/auth.js";
const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.get("/getuser", isAuth, GetCurrentUser);

router.get("/getalluser", allUser);

export default router;
