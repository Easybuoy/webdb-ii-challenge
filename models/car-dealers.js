const db = require("../data/dbConfig.js");

const get = async () => {
  return await db("car_dealer");
};

const getById = async id => {
  return await db("car_dealer").where({ id });
};

const insert = async car => {
  return await db("car_dealer").insert(car);
};

const remove = async id => {
  return await db("car_dealer")
    .where({ id })
    .delete();
};

function update(id, updatedCar) {
    return db('car_dealer')
      .where({ id })
      .update(updatedCar);
  }

module.exports = {
  get,
  getById,
  insert,
  remove,
  update
};
