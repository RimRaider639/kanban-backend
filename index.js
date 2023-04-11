const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const boardsRouter = require("./routes/boards.route");
const tasksRouter = require("./routes/tasks.route");
const subtasksRouter = require("./routes/subtasks.route");

const app = express();
app.use(cors(), express.json());

app.use("/user", userRouter);

app.use("/boards", boardsRouter);

app.use("/tasks", tasksRouter);

app.use("/subtasks", subtasksRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server started at port ${process.env.PORT}`);
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
});
