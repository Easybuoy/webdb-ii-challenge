const express = require("express");

const CarDealers = require("../models/car-dealers");

const Router = express.Router();

Router.get("/", async (req, res) => {
  const data = await CarDealers.get();
  if (data.length === 0) {
    return res.status(404).json({ status: "error", message: "No car found" });
  }
  res.json({ status: "success", data });
});

Router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const car = await CarDealers.getById(id);
  if (car.length === 0) {
    return res.status(404).json({ status: "error", message: "car not found" });
  }
  return res.json({ status: "success", data: car });
});

Router.post("/", async (req, res) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin && !make && !model && !mileage) {
    return res.status(400).json({
      status: "error",
      message: "vin, make, model and mileage fields are required"
    });
  }

  const newCar = await CarDealers.insert({ vin, make, mileage, model });

  if (newCar.length > 0) {
    return res.json({ status: "success", message: "Car created successfully" });
  }
  return res
    .status(500)
    .json({ status: "error", message: "Unable to create car" });
});

Router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const car = await CarDealers.getById(id);

  if (car.length === 0) {
    return res.status(404).json({ status: "error", message: "Car not found" });
  }
  const deletedCar = await CarDealers.remove(id);
  if (deletedCar == 1) {
    return res.json({
      status: "success",
      message: "Car deleted successfully"
    });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Unable to delete car" });
});

Router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { vin, make, model, mileage } = req.body;
  if (!vin && !make && !model && !mileage) {
    return res.status(400).json({
      status: "error",
      message: "vin, make, model and mileage fields are required"
    });
  }

  const car = await CarDealers.getById(id);

  if (car.length === 0) {
    return res.status(404).json({ status: "error", message: "Car not found" });
  }
  const updatedCar = await CarDealers.update(id, { vin, make, model, mileage });

  if (updatedCar == 1) {
    return res.json({
      status: "success",
      message: "Car updated successfully"
    });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Unable to update car" });
});

module.exports = Router;
