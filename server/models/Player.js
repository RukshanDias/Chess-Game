const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    matches: {
        type: Number,
        default: 0,
    },
    won: {
        type: Number,
        default: 0,
    },
    lost: {
        type: Number,
        default: 0,
    },
    draw: {
        type: Number,
        default: 0,
    },
    points: {
        type: Number,
        default: 0,
    },
});
module.exports = mongoose.model("Player", playerSchema);
