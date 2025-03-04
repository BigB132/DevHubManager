const {Schema, model} = require("mongoose");

const projectData = new Schema({
    projectId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    projectDesc: {
        type: String,
        required: true,
    },
    channelIds: {
        type: String,
        default: "",
    },
});

module.exports = model("ProjectData", projectData);