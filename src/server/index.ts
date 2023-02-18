import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/robots", (req, res) => {
  res.status(200).json({ hello: "Hello there!" });
});

export default app;
