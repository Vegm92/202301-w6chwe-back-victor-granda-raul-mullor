import { Router } from "express";
import loginUser from "../controllers/usersControllers";

const userRouter = Router();

userRouter.post("/login", loginUser);

export default userRouter;
