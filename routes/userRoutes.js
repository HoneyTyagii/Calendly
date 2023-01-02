const express = require("express");
const bcrypt = require("bcrypt"); //* bcrypt is a 3rd party library which we use to hash, salt and compare passwords
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");

const router = express.Router();





router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body; //* destructuring name, email and password out of the request body

    const existingUser = await User.findOne({email}); //* check if the user with the entered email already exists in the database
    if (existingUser) {
      return res.status(403).json({ err: "User already exists" });
    }

    if (!validateName(name)) {
      return res.status(400).json({
        err: "Invalid user name: name must be longer than two characters and must not include any numbers or special characters",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ err: "Error: Invalid email" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        err: "Error: Invalid password: password must be at least 8 characters long and must include atleast one - one uppercase letter, one lowercase letter, one digit, one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10)); //* hashes the password with a salt, generated with the specified number of rounds

    const userDetails = {
      email,
      name,
      password: hashedPassword,
    };

    const newUser = new User(userDetails); //* creates a new user with the details provided by the user
    await newUser.save(); //* saves the new user to the database

    console.log(newUser);
    return res.status(201).json({ msg: "User created successfully" });
    }catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
});


router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body; //* destructuring email and password out of the request body

    if (email.length === 0) {
      return res.status(400).json({ err: "Please enter your email" });
    }
    if (password.length === 0) {
      return res.status(400).json({ err: "Please enter your password" });
    }

    const existingUser = await User.findOne({ where: { email: email } }); //* check if the user with the entered email exists in the database
    if (!existingUser) {
      return res.status(404).json("Error: User not found");
    }

    //* hashes the entered password and then compares it to the hashed password stored in the database
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res.status(400).json({ err: "Invalid credentials" });
    }

    console.log(existingUser,existingUser.id);
    const payload = {user: {id: existingUser.id}};
    const bearerToken = jwt.sign(payload, SECRET, {
        expiresIn: 360000,
    },

        res.cookie("t", bearerToken, { expire: new Date() + 9999 }));

    console.log("Logged in successfully");

    return res.status(200).json({ message: "Signed In Successfully!", bearerToken: bearerToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});


router.get("/signout", (_req, res) => {
    res.clearCookie("t");
    return res.status(200).json({ message: "Signed out successfully" });
});

module.exports = router;