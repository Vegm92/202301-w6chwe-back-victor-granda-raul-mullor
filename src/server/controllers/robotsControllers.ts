import Robot from "../../database/models/robotSchema.js";
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const robots = await Robot.find().exec();
    res.status(200).json({ robots });
  } catch (error) {
    const customError = new CustomError(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      error.message,
      500,
      "Couldn't retrieve robots"
    );

    next(customError);
  }
};
