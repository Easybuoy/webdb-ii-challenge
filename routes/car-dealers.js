const express = require("express");

const Accounts = require("../models/car-dealers");

const Router = express.Router();

Router.get("/", async (req, res) => {
  const data = await Accounts.get();

  res.json({ status: "success", data });
});

Router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const account = await Accounts.getById(id);
  if (account.length === 0) {
    return res
      .status(404)
      .json({ status: "error", message: "Account not found" });
  }
  return res.json({ status: "success", data: account });
});

Router.post("/", async (req, res) => {
  const { name, budget } = req.body;
  if (!name && !budget) {
    return res.status(400).json({
      status: "error",
      message: "Name and Budget fields are required"
    });
  }

  const newAccount = await Accounts.insert({ name, budget });
  res.json({ status: "success", data: newAccount });
});

Router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const account = await Accounts.getById(id);

  if (account.length === 0) {
    return res
      .status(404)
      .json({ status: "error", message: "Account not found" });
  }
  const deleteAccount = await Accounts.remove(id);
  if (deleteAccount == 1) {
    return res.json({
      status: "success",
      message: "Account deleted successfully"
    });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Unable to delete account" });
});

module.exports = Router;