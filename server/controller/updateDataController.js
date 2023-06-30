const User = require("../models/Player");

// update dta - controller
const updateData = async (req, res) => {
    let username = req.body.username;
    username = username.replace(/^['"]|['"]$/g, "");
    const result = req.body.result;

    updateUserPoints(username, result);
    res.send("done");
};

// mongoose update
const updateUserPoints = async (username, result) => {
    try {
        const user = await User.findOne({ username });

        if (user) {
            // get current user data
            let newWon = user.won;
            let newLost = user.lost;
            let newDraw = user.draw;
            let newPoints = user.points;

            // calculate & update
            if (result == "won") {
                newWon++;
                newPoints = newPoints + 20;
            } else if (result == "lost") {
                newLost++;
                newPoints = newPoints + 0;
            } else if (result == "draw") {
                newDraw++;
                newPoints = newPoints + 10;
            }
            const newMatches = user.matches + 1;

            console.log(newWon, newLost, newDraw, newPoints);

            const filter = { username: username }
            const update = { $set: { matches: newMatches, won: newWon, lost: newLost, draw: newDraw, points: newPoints } };

            const updatedUser = await User.findOneAndUpdate(filter, update, { new: true });
            console.log("User points updated successfully.");
        } else {
            console.log("User not found.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

module.exports = { updateData };
