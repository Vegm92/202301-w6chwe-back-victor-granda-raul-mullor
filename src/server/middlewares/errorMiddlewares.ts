import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";

const debug = createDebug("robots:server");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response
) => {
  debug(error.message);
  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Unable to load" });
};
