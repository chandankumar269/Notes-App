const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const {protect} = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  const notes = await Note.find({
    user: req.user.id
  });

  res.json(notes);
});

router.post("/", protect, async (req, res) => {
  const note = await Note.create({
    ...req.body,
    user: req.user.id
  });
  res.json(note);
});

router.put("/:id", protect, async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(note);
});

router.delete("/:id", protect, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;