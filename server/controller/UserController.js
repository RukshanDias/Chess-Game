const User = require("../models/Player");

// login
const loginUser = async (req, res) => {
    res.json({ msg: "login" });
};

// register
const registerUser = async (req, res) => {
    console.log("in controller");
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    try {
        console.log("in try");
        await user.save();
        console.log("data saved");
        // res.redirect("/");
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            console.log("already registered");
        } else {
            res.status(500).send("error");
            // res.redirect("/");
        }
    }
};

module.exports = { loginUser, registerUser };
