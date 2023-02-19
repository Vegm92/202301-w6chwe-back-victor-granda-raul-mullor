import { Router } from "express";
import { getRobots } from "../controllers/robotsControllers";

export const robotsRouter = Router();
robotsRouter.get("/", getRobots);
