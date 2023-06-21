const User = require("../models/Player");

// login
const loginUser = async (req, res) => {
    console.log("login called");
    if (req.body.username && req.body.password) {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username, password: password });

        if (user) {
            req.session.user = user;
            req.session.authorized = true;
            req.session.save();
            res.send({ username: username });
        } else {
            res.status(500).send("error");
        }
    }
};

// register
const registerUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    try {
        await user.save();
        req.session.username = req.body.username;
        res.send({ success: true, username: req.body.username });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            console.log("already registered");
            res.send({ success: false });
        } else {
            res.status(500).send("error");
        }
    }
};

//session
const getSession = (req, res) => {
    console.log(req.session);
    // console.log("session set 3 ->", req.session.user.username);
    const username = req.session;
    console.log("server name->", username);
    res.json({ username });
};

module.exports = { loginUser, registerUser, getSession };
