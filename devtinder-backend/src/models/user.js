const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 25
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            min: 18,
            max: 99
        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Gender data is not valid");
                }
            }
        },
        photoURL: {
            type: String,
            default: "https://geographyandyou.com/images/user-profile.png"
        },
        about: {
            type: String,
            default: "This is a default about of user"
        },
        skills: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);