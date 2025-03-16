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
    ownerRoleId: {
        type: String,
        required: true,
    },
    channelIds: {
        type: [String],
        default: [],
    },
    roleIds: {
        type: [String],
        default: [],
    },
    createChannelType: {
        type: String,
        default: "",
    },
    //hire
    hireChannelId: {
        type: String,
        default: "0",
    },
    hireCurrentMsg: {
        type: String,
        default: "0",
    },
    jobName: {
        type: [String],
        default: [],
    },
    jobDesc: {
        type: [String],
        default: [],
    },
    jobMoney: {
        type: [Number],
        default: [],
    },
    jobAmount: {
        type: [Number],
        default: [],
    },
    gameEngine: {
        type: Number,
        default: 0,
    },
    memberIds: {
        type: [Number],
        default: []
    },
    memberJobs: {
        type: [Number],
        default: [],
    }
});

module.exports = model("ProjectData", projectData);