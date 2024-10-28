require("dotenv").config();
const mongoose = require("mongoose");

const dbBaseUrl = process.env.MONGO_URL;

const connectprofileDb = async () => {
    try {
        await mongoose.connect(`${dbBaseUrl}profile`);
        console.log("Connected to auth database");
    } catch {
        console.log("Error connecting to auth database");
    }
};

module.exports = connectprofileDb;
