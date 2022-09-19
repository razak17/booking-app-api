import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findUserByEmail } from "../user/user.service";
import { LoginBody } from "./auth.schema";
import { signJwt } from "../../utils/jwt";
import argon2 from "argon2";

const COOKIE_NAME = "accessToken";

export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  const { email, password: bodyPassword } = req.body;

  // find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }

  const isValid = await argon2.verify(user.password, bodyPassword);
  if (!isValid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }

  const {password, ...rest} = user;
  const jwt = signJwt(rest);

  res.cookie(COOKIE_NAME, jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);
}

export async function logoutHandler(_: Request, res: Response) {
  const user = res.locals.user;

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized.");
  }
  res.clearCookie(COOKIE_NAME);
  res.end();
}

