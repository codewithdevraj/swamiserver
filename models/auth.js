const mongoose = require("mongoose");
const authSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            default: () => new mongoose.Types.ObjectId()
        }
    },
    {
        timestamps: true,
    }
);

const AuthSchema = mongoose.model("auth", authSchema);

module.exports = AuthSchema;