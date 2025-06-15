const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const connectionRequestsRouter = express.Router();

connectionRequestsRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    const { user } = req;

    try {
        const fromUserId = user._id;
        const { toUserId, status } = req.params;

        // if(fromUserId.equals(toUserId)){
        //     return res.status(400).send(`You cannot send connection request to yourself`);
        // }

        const allowedStatus = ["interested", "ignored"];

        if (!allowedStatus.includes(status)) {
            return res.status(401).send(`Invalid status type: ${status}`);
        }

        // check if there is an existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).send(`Connection Request already exists`);
        }

        const toUserInfo = await User.findById(toUserId);

        if(!toUserInfo){
            return res.status(401).send(`User to which you are sending request doesnot exist`);
        }

        const connectionRequestInfo = new ConnectionRequest({
            fromUserId, toUserId, status
        });

        await connectionRequestInfo.save();

        res.send(`${user.firstName} sent the connect request to ${toUserInfo.firstName}`);

    } catch (error) {
        res.status(400).send("ERROR: " + error?.message);
    }

});

module.exports = connectionRequestsRouter;