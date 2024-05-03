const router = require('express').Router();
const knex = require("knex")(require("../knexfile"));
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// GET /profile/ - protected route, needs auth
router.get('/', async (req, res) => {
  // Check for authorization header (if not included, return 401)
  if (!req.headers.authorization) {
    return res.status(401).send("Please provide the token in authorization header");
  }

  console.log('Auth Header: ', req.headers.authorization);

  // Parse authorization header (remove "Bearer " from header)
  const parsedToken = req.headers.authorization.slice("Bearer ".length);

  console.log('Parsed token: ', parsedToken);

  // Verify the token (if not valid, return 401)
  try {
    const decodedPayload = jwt.verify(parsedToken, JWT_SECRET);

    // If token is valid, use the decoded payload, to get the info we need with the payload
    const user = await knex("users").where({ id: decodedPayload.user_id }).first();
    delete user.password;
    res.status(200).json(user);
  } catch(err) {
    console.log(err)
    res.status(401).send("Token you have provided is invalid");
  }

  
});

module.exports = router;