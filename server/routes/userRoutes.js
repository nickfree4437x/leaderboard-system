const express = require("express");
const router = express.Router();
const User = require("../models/User");


// GET all users, sorted by points desc
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST - Add new user
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: "User creation failed" });
  }
});


module.exports = router;
