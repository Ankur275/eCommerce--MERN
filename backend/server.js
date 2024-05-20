const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./db/dbConnect");

//Uncaught error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/.env" });

//connect to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.error('Stack:', err.stack);
  console.log(`Shutting down server due to UnHandled Promiuse Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
