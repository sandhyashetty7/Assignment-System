const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Create assignment
router.post('/', async (req, res) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.json(assignment);
});

// Get all assignments
router.get('/', async (req, res) => {
  const data = await Assignment.find();
  res.json(data);
});

// Get single assignment
router.get('/:id', async (req, res) => {
  const data = await Assignment.findById(req.params.id);
  res.json(data);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;