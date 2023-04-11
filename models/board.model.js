const mg = require("mongoose");

const boardSchema = mg.Schema({
  userID: { type: mg.SchemaTypes.ObjectId, ref: "user" },
  name: String,
  tasks: [{ type: mg.SchemaTypes.ObjectId, ref: "task" }],
});

const Board = mg.model("board", boardSchema);

module.exports = Board;
