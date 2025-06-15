const express = require("express");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.post("/user", async (req, res) => {
    const userEmailId = req.body.emailId;
    try {
        const response = await User.find({ emailId: userEmailId });
        if (response.length === 0) {
            res.status(200).send("User not found. please signup");
        }
        res.send(response);
    } catch (error) {
        res.status(500).send("Error fetching user. Error: " + error.message);
    }
});

userRouter.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const response = await User.findByIdAndDelete(userId);
        res.status(200).send("User deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting user. Error: " + error);
    }
});

userRouter.patch("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoURL", "about", "skills"];
        const isUpdateAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }

        const response = await User.findByIdAndUpdate(userId, data, { runValidators: true });
        res.status(200).send("User updated successfully");
    } catch (error) {
        res.status(500).send("Error updating user. Error: " + error);
    }
});

// Feed API - GET /feed - get all users from db
userRouter.get("/feed", async (req, res) => {
    try {
        const response = await User.find({});
        if (response.length === 0) {
            res.status(200).send("User not found. please signup");
        }

        res.send(response);

    } catch (error) {
        res.status(500).send("Error fetching user. Error: " + error.message);
    }
});


module.exports = userRouter;