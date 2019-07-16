const db = require("../data/dbConfig.js");

const get = async () => {
  return await db("car_dealer");
};

const getById = async id => {
  return await db("car_dealer").where({ id });
};

const insert = async account => {
  return await db("car_dealer").insert(account);
};

const remove = async id => {
  return await db("car_dealer")
    .where({ id })
    .delete();
};

module.exports = {
  get,
  getById,
  insert,
  remove
};
