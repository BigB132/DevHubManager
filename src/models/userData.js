const {Schema, model} = require("mongoose");

const userData = new Schema({
    userID: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        default: 0,
    },
    warns: {
        type: Number,
        default: 0,
    },
    finishedProjects: {
        type: Number,
        default: 0,
    },
});

module.exports = model("UserData", userData);