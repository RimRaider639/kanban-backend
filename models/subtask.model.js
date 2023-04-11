const mg = require("mongoose");

const subtaskSchema = mg.Schema({
  title: String,
  isCompleted: { type: mg.SchemaTypes.Boolean, default: false },
});

const Subtask = mg.model("subtask", subtaskSchema);

module.exports = Subtask;
