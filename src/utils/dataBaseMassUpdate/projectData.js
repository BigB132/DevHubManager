const mongoose = require("mongoose");
const ProjectData = require("../../models/projectData");
const {database_uri} = require("../../config.json");

async function migrate() {
    await mongoose.connect(database_uri, {});
    console.log("Connected successfully to database!");

    await ProjectData.updateMany({ memberJobs: { $exists: false } }, { $set: { memberJobs: [] } });
    console.log("Migration finished!");
}

migrate();