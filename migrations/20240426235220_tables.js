/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.string("username").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("posts", (table) => {
      table.increments("id").primary();
      table.string("post_body").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("patterns", (table) => {
      table.increments("id").primary();
      table.string("pattern_body").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema
    .dropTable("patterns")
    .dropTable("posts")
    .dropTable("users");
};
