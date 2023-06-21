const express = require("express");
const router = express.Router();

// controllers
const { loginUser, registerUser, getSession } = require("../controller/UserController");

// login
router.post("/login", loginUser);

// register
router.post("/register", registerUser);

// sessions
router.get("/session", getSession);

module.exports = router;
