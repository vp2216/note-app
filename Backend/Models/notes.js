const db = require("mongoose");

const noteSchema = new db.Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const noteModel = db.model("notes", noteSchema);

module.exports = noteModel;
