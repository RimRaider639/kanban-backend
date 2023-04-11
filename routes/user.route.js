const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 5);
    const newUser = new User({ email, password: hash });
    await newUser.save();
    res.send({ message: "User successfully registered" });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ id: user._id }, process.env.KEY);
      res.send({ message: "User successfully logged in", token });
    } else {
      res.status(401);
      res.send({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

module.exports = userRouter;
