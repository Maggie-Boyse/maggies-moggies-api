const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
const postsRoute = require("./routes/posts");
const createRoute = require("./routes/createPost");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "/public")));
app.use("/api/posts", postsRoute);
app.use("/api/posts", createRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});
