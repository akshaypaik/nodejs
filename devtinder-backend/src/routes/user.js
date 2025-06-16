const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

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

userRouter.get("/user/requests/received", userAuth, async (req, res) => {

    const { user } = req;

    try {
        const connectionRequest = await ConnectionRequest.find({
            toUserId: user._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "photoURL"]);

        res.send(connectionRequest);
    } catch (error) {
        res.send(500).json({
            message: `Error: ${error?.message}`
        })
    }


});


userRouter.get("/user/connections", userAuth, async (req, res) => {

    try {

        const { user } = req;

        const connections = await ConnectionRequest.find({
            status: "accepted",
            $or: [
                { toUserId: user._id },
                { fromUserId: user._id }
            ]
        }).populate("fromUserId", ["firstName", "lastName"]).populate("toUserId", ["firstName", "lastName"]);

        const data = connections.map(item => {
            if (item.fromUserId._id.equals(user._id)) {
                return item.toUserId;
            }
            return item.fromUserId;
        });

        res.send({ data, userId: user._id });

    } catch (error) {
        res.status(500).send("ERROR: " + error.message);
    }


});

userRouter.post("/user/feed", userAuth, async (req, res) => {
    try {

        const USER_SAFE_DATA = "firstName lastName photoURL";

        const { user } = req;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: user._id },
                { fromUserId: user._id }
            ]
        });

        const hideUserList = new Set();

        connectionRequest.forEach((item) => {
            hideUserList.add(item.fromUserId);
            hideUserList.add(item.toUserId);
        });

        const feedData = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserList) } },
                { _id: { $ne: user._id } }
            ]
        }).select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

        res.send(feedData);


    } catch (error) {
        res.status(500).send("ERROR: " + error.message);
    }
});

module.exports = userRouter;