const express = require("express");
const Task = require("../models/task.model");
const Board = require("../models/board.model");

const tasksRouter = express.Router();

tasksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id).populate(
      "subtasks",
      "_id title isCompleted"
    );
    res.send(task);
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

tasksRouter.post("/:id", async (req, res) => {
  const { id } = req.params; //board ID
  try {
    const newTask = new Task(req.body);
    const out = await newTask.save();
    await Board.findByIdAndUpdate(id, { $push: { tasks: out._id } });
    res.send({ message: "Task added" });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

tasksRouter.delete("/:id", async (req, res) => {
  const { id } = req.params; //task ID
  try {
    await Task.findByIdAndDelete(id);
    res.send({ message: "Task deleted" });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

tasksRouter.patch("/status/:id", async (req, res) => {
  const { id } = req.params; //task ID
  const { status } = req.body;
  try {
    await Task.findByIdAndUpdate(id, { status });
    res.send({ message: "Task status updated" });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

module.exports = tasksRouter;
