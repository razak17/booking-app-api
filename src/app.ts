import express from "express";
import cors from "cors";
import { connect } from "./utils/database";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  const port = process.env.PORT;
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.listen(port, async () => {
    console.log(`server started on http://localhost:${port}`);
    await connect();
  });
};

main().catch((err) => {
  console.error(err);
});

