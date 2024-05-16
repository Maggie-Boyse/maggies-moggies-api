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
      { expiresIn: "30min" }
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
    { expiresIn: "30min" }
  );

  res
    .status(200)
    .json({ token: authToken, username: user.username, user_id: user.id });
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userAccount = await knex("users").where({ id: userId }).first();
    if (!userAccount) {
      return res.status(404).json({ message: "user account not found" });
    }
    await knex("users").where({ id: userId }).del();
    res.sendStatus(204);
  } catch (error) {
    console.error("error deleting inventory item", error);
    res.status(500).json({ error: "ineternal server error" });
  }
});

module.exports = router;
