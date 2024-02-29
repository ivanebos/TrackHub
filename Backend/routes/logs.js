//Import
const express = require("express");
const { getLog, getLogs, createLog } = require("../controller/logController");

//Middle ware

const logs = express.Router();
//middleware

//get all routines
logs.get("/", getLogs);

//get single routine
logs.get("/:id", getLog);

//post new routine
logs.post("/", createLog);

module.exports = logs;
