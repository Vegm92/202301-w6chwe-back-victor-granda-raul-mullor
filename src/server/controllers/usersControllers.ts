import "./loadEnvironment.js";
import { type UserStructure } from "../../types.js";
import { CustomError } from "../../CustomError/CustomError.js";
import { User } from "../../database/models/usernameSchema.js";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

const loginUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserStructure>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: { $eq: username },
    password: { $eq: password },
  });

  if (!user) {
    const customError = new CustomError(
      "Wrong Credentials",
      401,
      "Wrong credentials"
    );

    next(customError);

    return;
  }

  const jwtPayload = { sub: user?._id };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);
  res.status(200).json({ token });
};

export default loginUser;
