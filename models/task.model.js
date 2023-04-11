const mg = require("mongoose");

const taskSchema = mg.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["Todo", "Doing", "Done"], default: "Todo" },
  subtasks: [{ type: mg.SchemaTypes.ObjectId, ref: "subtask" }],
});

const Task = mg.model("task", taskSchema);

module.exports = Task;
