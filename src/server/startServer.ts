import debug from "debug";
import app from "./index.js";
import chalk from "chalk";

const createDebug = debug("robots-server");

const startServer = async (port: number) =>
  new Promise((resolve) => {
    createDebug(chalk.red("Im alive!"));
    const server = app.listen(port);
    resolve(server);
  });

export default startServer;
