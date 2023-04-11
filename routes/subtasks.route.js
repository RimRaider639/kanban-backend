const express = require("express");
const Subtask = require("../models/subtask.model");
const Task = require("../models/task.model");
const subtasksRouter = express.Router();

subtasksRouter.post("/:taskID", async (req, res) => {
  const { taskID } = req.params;
  try {
    const newSubtask = new Subtask(req.body);
    const out = await newSubtask.save();
    await Task.findByIdAndUpdate(taskID, { $push: { subtasks: out._id } });
    res.send({ message: "Subtask added" });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

subtasksRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Subtask.findByIdAndDelete(id);
    res.send({ message: "Subtask deleted" });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

subtasksRouter.patch("/toggle/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const out = await Subtask.findById(id);
    await Subtask.findByIdAndUpdate(id, { isCompleted: !out.isCompleted });
    res.send("Toggled subtask");
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

module.exports = subtasksRouter;
