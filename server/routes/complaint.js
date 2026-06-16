const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

// ===============================
// CREATE COMPLAINT (USER ONLY)
// ===============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "All fields required",
      });
    }

    const complaint = new Complaint({
      title,
      description,
      userId: req.user.id,
      status: "Pending",
    });

    await complaint.save();

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// GET MY COMPLAINTS (USER ONLY)  ⭐ MUST BE ABOVE "/:id"
// ===============================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    console.log("USER:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Invalid user in token",
      });
    }

    const complaints = await Complaint.find({
      userId: req.user.id,
    });

    return res.json(complaints || []);
  } catch (err) {
    console.log("MY ROUTE ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// GET ALL COMPLAINTS (ADMIN ONLY)
// ===============================
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// GET SINGLE COMPLAINT
// ===============================
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    if (
      req.user.role !== "admin" &&
      complaint.userId !== req.user.id
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// UPDATE STATUS (ADMIN ONLY)
// ===============================
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    complaint.status = req.body.status || "Resolved";

    await complaint.save();

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// DELETE COMPLAINT (ADMIN ONLY)
// ===============================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    await complaint.deleteOne();

    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;