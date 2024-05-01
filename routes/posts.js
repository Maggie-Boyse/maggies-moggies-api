const express = require("express");
const router = express.Router();
// const fs = require("fs");
const knex = require("knex")(require("../knexfile"));

router.get("/posts", async (req, res) => {
  try {
    const postsData = await knex("posts")
      .join("users", "posts.user_id", "user_id")
      .select(
        "posts.id",
        "users.username",
        "posts.post_body",
        "posts.created_at"
      );
    res.status(200).json(postsData);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json(error);
  }
});

module.exports = router;
