const express = require("express");
const router = express.Router();
const Claim = require("../models/Claim");
const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory"); // ✅ Add this import

// ✅ POST /api/claim/:userId
router.post("/claim/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const points = Math.floor(Math.random() * 10) + 1;

    user.totalPoints += points;
    await user.save();

    const claim = await Claim.create({
      user: user._id,
      points,
    });

    await ClaimHistory.create({
      userId: user._id,
      pointsClaimed: points,
    });

    res.status(200).json({
      message: "Points claimed successfully",
      user,
      pointsClaimed: points,
      claim,
    });
  } catch (err) {
    console.error("❌ Claim error:", err);
    res.status(500).json({ error: "Claim failed" });
  }
});

// ✅ GET /api/claim-history
router.get("/claim-history", async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate("userId", "name") // populate user name
      .sort({ claimedAt: -1 });   // latest first

    res.status(200).json(history);
  } catch (err) {
    console.error("❌ Error fetching claim history:", err);
    res.status(500).json({ error: "Failed to fetch claim history" });
  }
});

module.exports = router;
