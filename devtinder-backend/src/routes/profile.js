const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const { user } = req;
        res.send(`Logged in user: ${user}`);
    } catch (error) {
        res.status(500).send("Error fetching user profile. Error: " + error.message);
    }

});

module.exports = profileRouter;