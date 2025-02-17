import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import axios from "axios";
import cors from "cors";
const app = express();
const port = 4000;

let last_id = 0;
function generateId() {
  return ++last_id;
}

const BASE_DB_URL = "http://localhost:3000";
const SECRET_KEY = "myBABA";

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const generatedId = generateId();
  try {
    const users = await axios.get(`${BASE_DB_URL}/users`);
    const userExists = users.data.find((user) => user.username === username);
    if (userExists) {
      return res.status(400).send("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    if (hashPassword) {
      const newUser = {
        id: generatedId,
        username,
        password: hashPassword,
      };
      console.log(newUser);
      await axios.post(`${BASE_DB_URL}/users`, newUser);
      res.status(201).send("User created successfully");
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await axios.get(`${BASE_DB_URL}/users?username=${username}`);
    if (!user.data) {
      res.status(401).send("Invalid username or password");
    }
    const isMatch = await bcrypt.compare(password, user.data[0].password);
    if (!isMatch) {
      return res.status(401).send("Invalid username or password");
    }
    const token = jwt.sign({ id: user.data[0].id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.send("Login successful");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

app.get("/logout", (req, res) => {
  console.log("Logout");

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.send("Logout page");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
