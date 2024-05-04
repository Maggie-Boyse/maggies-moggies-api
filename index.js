const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
const postsRoute = require("./routes/posts");
const createPostRoute = require("./routes/posts");
const patternsRoute = require("./routes/patterns");
const createPatternRoute = require("./routes/patterns");
const signUpRoute = require("./routes/auth");
// const signInRoute = require("./routes/auth");
// const profileRoute = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/api/posts", postsRoute);
app.use("/api/posts", createPostRoute);
app.use("/api/patterns", patternsRoute);
app.use("/api/patterns", createPatternRoute);
app.use("/api/users", signUpRoute);
// app.use("/api/users", signInRoute);
// app.use("/api/users", profileRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});
