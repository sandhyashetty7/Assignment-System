const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

// Submit assignment
router.post('/:assignmentId', async (req, res) => {
  const assignment = await Assignment.findById(req.params.assignmentId);

  if (!assignment) {
    return res.status(404).json({ message: "Not found" });
  }

  if (new Date() > assignment.dueDate) {
    assignment.status = 'closed';
    await assignment.save();
    return res.status(400).json({ message: "Deadline passed" });
  }

  const submission = new Submission({
    assignmentId: assignment._id,
    studentName: req.body.studentName,
    content: req.body.content
  });

  await submission.save();
  res.json(submission);
});

// Get submissions
router.get('/:assignmentId', async (req, res) => {
  const data = await Submission.find({
    assignmentId: req.params.assignmentId
  });
  res.json(data);
});

module.exports = router;