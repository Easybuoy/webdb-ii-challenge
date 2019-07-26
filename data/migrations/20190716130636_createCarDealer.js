exports.up = function(knex) {
  return knex.schema.createTable("car_dealer", tbl => {
    tbl.increments();

    tbl.text("vin", 128).notNullable();
    tbl.text("make", 128).notNullable();
    tbl.text("model", 128).notNullable();
    tbl.text("mileage", 128).notNullable();
    tbl.text("transmission_type", 128);
    tbl.text("status", 128);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("car_dealer");
};
