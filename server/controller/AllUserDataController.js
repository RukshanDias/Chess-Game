const User = require("../models/Player");

//get all user data sort by points
const getAllUserData = async (req, res) => {
    const allData = await User.find().sort({ points: -1 });
    res.send(allData);
};

module.exports = { getAllUserData };
