const router = require("express").Router();
const bcrypt = require("bcryptjs");
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send("Please include all the required fields");
  }

  const encryptedPassword = bcrypt.hashSync(password, 8);

  try {
    await knex("users").insert({
      email,
      username,
      password: encryptedPassword,
    });

    const user = await knex("users").where({ username }).first();

    const authToken = jwt.sign(
      {
        user_id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.status(200).json({ token: authToken, username: user.username });
  } catch (err) {
    res
      .status(500)
      .send("Sorry, we're having some trouble signing up right now");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("log is heree", req.body, username, password);

  if (!username || !password) {
    return res.status(400).send("Please include all the required fields");
  }

  const user = await knex("users").where({ username }).first();
  if (!user) {
    return res.status(404).send("Sorry, user not found");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).send("Sorry, password is incorrect");
  }

  const authToken = jwt.sign(
    {
      user_id: user.id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: "30m" }
  );

  res.status(200).json({ token: authToken, username: user.username });
});

module.exports = router;
