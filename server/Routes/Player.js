const express = require("express");
const router = express.Router();

// controllers
const { loginUser, registerUser, getSession } = require("../controller/UserController");
const { updateData } = require("../controller/updateDataController");

// login
router.post("/login", loginUser);

// register
router.post("/register", registerUser);

// sessions
router.get("/session", getSession);

// update data
router.post("/updateData", updateData);

module.exports = router;
