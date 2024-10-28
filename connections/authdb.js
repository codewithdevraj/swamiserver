require("dotenv").config();
const mongoose = require("mongoose");

const dbBaseUrl = process.env.MONGO_URL;

const connectAuthDb = async () => {
    try {
        await mongoose.connect(`${dbBaseUrl}auth`);
        console.log("Connected to auth database");
    } catch {
        console.log("Error connecting to auth database");
    }
};

module.exports = connectAuthDb;
