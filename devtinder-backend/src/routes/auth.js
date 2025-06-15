const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt"); 

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

    try {
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });

        await user.save();
        res.send("User added successfully");
    } catch (error) {
        res.status(500).send("User saving user. Error: " + error.message);
    }

});

authRouter.post("/login", async (req, res) => {

    try {

        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid credentials!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials!");
        }

        const token = await user.getJWT();

        res.cookie('token', token);

        res.send("User logged in successfully");
    } catch (error) {
        res.status(500).send("User login failed. Error: " + error.message);
    }

});

module.exports = authRouter;