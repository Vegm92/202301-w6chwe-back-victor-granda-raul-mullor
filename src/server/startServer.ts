import createDebug from "debug";
import chalk from "chalk";
import { app } from ".";

const debug = createDebug("robots:root");

const startServer = async (port: number) =>
  new Promise((resolve) => {
    debug(chalk.red("Im alive!"));
    const server = app.listen(port);
    resolve(server);
  });

export default startServer;
