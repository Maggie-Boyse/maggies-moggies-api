/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      email: "maggie_boyse@hotmail.com",
      password: "moggie-admin866",
      username: "maggies-moggies",
    },
  ]);
};
