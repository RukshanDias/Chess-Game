const express = require("express");
const router = express.Router();

// controllers
const { getAllUserData} = require("../controller/AllUserDataController");

// all user data
router.post("/allUserData", getAllUserData);

module.exports = router;
