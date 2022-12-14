import express from "express";
import cors from "cors";
import { connect } from "./utils/database";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import hotelRoute from "./modules/hotel/hotel.route";
import roomRoute from "./modules/room/room.route";
import deserializeUser from "./middleware/deserializeUser";

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

  app.get("/api/v1/health", (req, res) => {
    res.send({ status: "ok" });
  });

  app.use(deserializeUser);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/hotels", hotelRoute);
  app.use("/api/v1/rooms", roomRoute);

  app.listen(port, async () => {
    console.log(`server started on http://localhost:${port}`);
    await connect();
  });
};

main().catch((err) => {
  console.error(err);
});
