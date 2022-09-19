import express from "express";
import { processRequestBody } from "zod-express-middleware";

const router = express.Router();

//get current user
router.get("/me", (_, res) => {
  return res.send(res.locals.user);
});


export default router;
