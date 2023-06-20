const express = require("express");
const router = express.Router();

// controllers
const { loginUser, registerUser } = require("../controller/UserController");

// login
router.post("/login", loginUser);

// register
router.post("/register", registerUser);

module.exports = router;
