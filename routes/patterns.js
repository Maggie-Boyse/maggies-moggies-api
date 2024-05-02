const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

// router.get("/", async (req, res) => {
//   try {
//     const postsData = await knex("patterns")
//       .join("users", "posts.user_id", "user_id")
//       .select(
//         "posts.id",
//         "users.username",
//         "posts.post_body",
//         "posts.created_at"
//       );
//     res.status(200).json(postsData);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     res.status(500).json(error);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const newPatternData = req.body;
    console.log(newPatternData);
    await knex("patterns").insert(newPatternData);
    res.status(200).json(newPatternData);
  } catch (error) {
    console.error("Error sending pattern:", error);
    res.status(500).json(error);
  }
});

module.exports = router;
