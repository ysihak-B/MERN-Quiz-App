const express = require('express')
const router = express.Router()
const User=require("../model/auth.model.js")



router.post("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const quizIndex = user.quizAttempted.findIndex(
      (quiz) => quiz.quizId.toString() === req.body.quizId
    );
  
    if (quizIndex !== -1) {
      user.quizAttempted[quizIndex].results.push({ attempt: req.body.quizResult });
    } else {
      user.quizAttempted.push({
        quizId: req.body.quizId,
        results: [{ result: req.body.quizResult }],
      });
    }
  
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
  });

  module.exports =router
  