import Robot from "../../database/models/robotSchema";
import { type Request, type Response } from "express";

export const getRobots = async (req: Request, res: Response) => {
  const robots = await Robot.find({});

  res.status(200).json({ robots });
};
