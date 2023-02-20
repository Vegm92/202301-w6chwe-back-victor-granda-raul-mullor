import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const reqHeaderAuthorization = req.header("Authorization");
  const token = reqHeaderAuthorization!.replace(/^Bearer\s*/, "");
  const messageDebug = "Missing authorization header";
  const publicMessage = "Missing valid token";
  const unauthorizedCode = 401;

  if (!reqHeaderAuthorization) {
    const customError = new CustomError(
      messageDebug,
      unauthorizedCode,
      publicMessage
    );

    next(customError);

    return;
  }

  if (!token) {
    const customError = new CustomError(
      messageDebug,
      unauthorizedCode,
      publicMessage
    );
    next(customError);
  }

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    next(error);
  }

  next();
};

export default auth;
