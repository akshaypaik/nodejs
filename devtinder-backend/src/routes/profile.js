const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const { user } = req;
        res.send(`Logged in user: ${user}`);
    } catch (error) {
        res.status(500).send("Error fetching user profile. Error: " + error.message);
    }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const { user } = req;
        const data = req.body;

        if (!validateEditProfileData(req)) {
            throw new Error("Invalid edit request");
        }

        // Object.keys(req.body).forEach((key) => user[key] = req.body[key]);
        // await user.save();
        const response = await User.findByIdAndUpdate(user._id, data);

        res.json({
            message: `${user.firstName}, your profile edited successfully`,
            data: response
        });
    } catch (error) {
        res.status(500).send("Error editing user profile. Error: " + error.message);
    }
});

module.exports = profileRouter;