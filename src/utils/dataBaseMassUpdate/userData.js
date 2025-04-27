const mongoose = require("mongoose");
const UserData = require("../../models/userData");
const {database_uri} = require("../../config.json");

async function migrate() {
    await mongoose.connect(database_uri, {});
    console.log("Connected successfully to database!");

    await UserData.updateMany({ claimedDaily: { $exists: false } }, { $set: { claimedDaily: 0 } });
    console.log("Migration finished!");
}

migrate();