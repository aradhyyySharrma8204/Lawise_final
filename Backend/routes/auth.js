// routes/auth.js
const express = require('express');
const { signup, login } = require('../controller/authcontroller');
const authMiddleware = require('../controller/authmiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected route example
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({ message: "This is your profile.", user: req.user });
});

module.exports = router;
