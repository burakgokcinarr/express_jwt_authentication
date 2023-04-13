require("dotenv").config({ debug: true });
var express = require("express");
var cors = require("cors");
var app = express();

const {
  generateToken,
  refreshToken,
  verifyRefreshToken,
} = require("./src/Token");
const { isAuthenticated } = require("./src/helper/isAuthenticated");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //console.log(`${username} is trying to login ..`);
  if (username === "burak" && password === "1234") {
    return res.json({
      token: generateToken(username),
      refreshtoken: refreshToken(username),
    });
  }

  return res
    .status(401)
    .json({ message: "The username and password your provided are invalid" });
});

app.post("/home", isAuthenticated, (req, res) => {
  return res.status(200).json({
    message: `Congrats! You can now accesss the super secret resource`,
  });
});

app.post("/refresh", (req, res) => {
  const { refreshtoken } = req.body;
  const username = verifyRefreshToken(refreshtoken);
  if (username) {
    return res.json({
      token: generateToken(username),
      refreshtoken: refreshToken(username),
    });
  }

  return res.status(401).send("Can't refresh. Invalid Token");
});

app.listen(process.env.SERVER_LIST_PORT, async () => {
  console.log(`${process.env.SERVER_LIST_PORT} port listening....`);
});
