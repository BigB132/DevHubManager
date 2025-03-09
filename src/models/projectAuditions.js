const {Schema, model} = require("mongoose");

const auditionData = new Schema({
    userId: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    }
});

module.exports = model("AuditionData", auditionData);