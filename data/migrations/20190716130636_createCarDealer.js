exports.up = function(knex) {
  return knex.schema.createTable("car_dealer", tbl => {
    tbl.increments();

    tbl
      .text("name", 128)
      .unique()
      .notNullable();

    tbl.text("model", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("car_dealer");
};
