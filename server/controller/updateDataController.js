const User = require("../models/Player");

// update dta - controller
const updateData = async (req, res) => {
    let username = req.body.username;
    username = username.replace(/^['"]|['"]$/g, "");
    const result = req.body.result;
    const pointsToAdd = pointsCalculation(result);

    updateUserPoints(username, pointsToAdd);
};

// mongoose update
const updateUserPoints = async (username, points) => {
    try {
        const user = await User.findOne({ username });

        if (user) {
            const updatedPoints = user.points + points;
            console.log("new points", updatedPoints);
            user.points = updatedPoints;
            await user.save();
            console.log("User points updated successfully.");
        } else {
            console.log("User not found.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

// points calculation
const pointsCalculation = (result) => {
    if (result == "won") {
        return 20;
    } else if (result == "lost") {
        return 10;
    } else if (result == "drawn") {
        return 0;
    }
};
module.exports = { updateData };
