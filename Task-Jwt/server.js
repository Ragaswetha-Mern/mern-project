const app = require("./app");
const getEnvironmentVariables = require("dotenv");
const directoryPath = require("path");
const mongooseDb = require("./config/database");
const chalk = require("chalk");

getEnvironmentVariables.config({
  path: directoryPath.join(__dirname, "config", "config.env"),
});

mongooseDb();

const server = app.listen(process.env.PORT, () => {
  console.log(
    chalk.green(
      `Server Listening to port ${process.env.PORT} and Environment ${process.env.NODE_ENV}`
    )
  );
});

process.on("unhandledRejection", (error) => {
  console.log(chalk.red.bold(`Error: ${error.message}`));
  console.log(
    chalk.bgRed.white(
      `Shutting down the server due to an unhandled rejection exception`
    )
  );
  server.close(() => {
    //this will close the server
    process.exit(1); //this will close the node
  });
});
process.on("uncaughtException", (error) => {
  console.log(chalk.red.bold(`Error: ${error.message}`));
  console.log(
    chalk.bgRed.white(`Shutting down the server due to an uncaught exception`)
  );
  server.close(() => {
    //this will close the server
    process.exit(1); //this will close the node
  });
});
//console.log(a) - here a is undefined
