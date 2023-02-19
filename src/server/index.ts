import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares";
import { robotsRouter } from "./routers/robotsRouters";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/robots", robotsRouter);

app.use(notFoundError);
app.use(generalError);
