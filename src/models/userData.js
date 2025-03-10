const {Schema, model} = require("mongoose");

const userData = new Schema({
    userID: {
        type: String,
        required: true,
    },
    warns: {
        type: Number,
        default: 0,
    }
});

module.exports = model("UserData", userData);