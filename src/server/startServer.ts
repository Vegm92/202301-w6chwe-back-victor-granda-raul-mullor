import "../loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { app } from "./index.js";
import { type CustomError } from "../CustomError/CustomError.js";

const debug = createDebug("robots:server");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    debug(chalk.red("Im alive!"));
    const server = app.listen(port, () => {
      debug(chalk.green(`Start at server 'http://localhost:${port}'`));
      resolve(server);
    });
    server.on("error", (error: CustomError) => {
      let errorMessage = "Error starting a new server";

      if (error.code === "EADDRINUSE") {
        errorMessage += `Port ${port} not available`;
      }

      reject(new Error(errorMessage));
    });
  });

export default startServer;
