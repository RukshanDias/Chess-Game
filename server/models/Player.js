const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    matches: {
        type: Number,
        required:true
    },
    won: {
        type: Number,
        required:true
    },
    lost: {
        type: Number,
        required:true
    },
    draw: {
        type: Number,
        required:true
    },
    points: {
        type: Number,
        required:true
    },
});
module.exports = mongoose.model("Player", playerSchema);
