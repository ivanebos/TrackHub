const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    address: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Log", logSchema);
