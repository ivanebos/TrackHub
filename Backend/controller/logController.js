const Log = require("../models/logModel");
const mongoose = require("mongoose");
//get all workout
const getLogs = async (req, res) => {
  const logs = await Log.find().sort({ createdAt: -1 });

  res.status(200).json(logs);
};

//get all logs bettwen from and to dates
const getLog = async (req, res) => {
  const logs = await Log.find();
  res.status(200).json(logs);
};

//create new log
const createLog = async (req, res) => {
  const address = "ivan";
  const status = "ebo";
  const description = "s";

  try {
    const log = await Log.create({ address, status, description });

    res.status(200).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a log
const deleteLog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such log" });
  }
  const log = await Log.findOneAndDelete({ _id: id });

  if (!log) {
    return res.status(400).json({ error: "No such log" });
  }

  res.status(200).json(log);
};

module.exports = {
  getLogs,
  getLog,
  createLog,
};
