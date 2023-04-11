const express = require("express");
const Board = require("../models/board.model");
const authenticate = require("../middlewares/authenticate.middleware");

const boardsRouter = express.Router();

boardsRouter.use(authenticate);

boardsRouter.get("/", async (req, res) => {
  const { userID, ...rest } = req.body;
  try {
    const boards = await Board.find({ userID }).populate(
      "tasks",
      "title subtasks status"
    );
    res.send(boards);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

boardsRouter.post("/", async (req, res) => {
  let { name, userID, tasks } = req.body;
  console.log(req.body);
  try {
    if (!name) {
      const all = await Board.find({ userID });
      name = "Board" + (all.length + 1);
    }
    const newBoard = new Board({ name, userID, tasks });
    await newBoard.save();
    res.send({ message: "Board created" });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

module.exports = boardsRouter;
