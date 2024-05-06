const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/", async (req, res) => {
  const { keywords } = req.query;
  const decodedKeywords = decodeURI(keywords);
  console.log(keywords);
  try {
    const patternsData = await knex("patterns")
      // .whereILike({ pattern_title: `%${decodedKeywords}%` })
      .join("users", "users.id", "patterns.user_id")
      .select(
        "patterns.id",
        "patterns.pattern_title",
        "users.username",
        "patterns.pattern_body",
        "patterns.created_at"
      );
    res.status(200).json(patternsData);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json(error);
  }
});

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
