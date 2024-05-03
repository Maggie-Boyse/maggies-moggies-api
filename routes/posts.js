const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const newPostData = req.body;
    console.log(newPostData);
    await knex("posts").insert(newPostData);
    res.status(200).json(newPostData);
  } catch (error) {
    console.error("Error sending post:", error);
    res.status(500).json(error);
  }
});



module.exports = router;
