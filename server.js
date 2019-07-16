const express = require("express");

const carDealerRoutes = require("./routes/car-dealers");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  return res.json({ status: "success", message: "Welcome to Car Dealer API" });
});
server.use("/api/cardealer", carDealerRoutes);

module.exports = server;