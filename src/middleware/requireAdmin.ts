import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

function requireAdmin(_: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user.isAdmin) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }

  return next();
}


export default requireAdmin;
