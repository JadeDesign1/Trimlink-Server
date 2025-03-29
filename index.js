import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import shortenUrlRouter from "./routes/urlRoutes.js";
import DbSetup from "./db/connectDb.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", shortenUrlRouter);

const start = async () => {
  try {
    await DbSetup(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log({ error: error });
  }
};

start();
