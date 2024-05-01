/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      id: 1,
      post_body:
        "Welcome to Maggie's Moggies! Leave a post here about your projects, meetups, making crochet friends, and more!",
        user_id: 1
    },
  ]);
};
