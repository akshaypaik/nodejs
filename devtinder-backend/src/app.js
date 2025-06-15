const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const PORT = 4002;

const app = express();

app.use(express.json());

connectDB().then(() => {
    console.log("DB connection established!");
    app.listen(PORT, () => {
        console.log("Devtinder app is listening on: ", PORT);
    });
}).catch((error) => {
    console.error("DB cannot be connected! ERROR: ", error);
});

app.post("/user", async (req, res) => {
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

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const response = await User.findByIdAndDelete(userId);
        res.status(200).send("User deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting user. Error: " + error);
    }
});

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const response = await User.findByIdAndUpdate(userId, data, { runValidators: true });
        res.status(200).send("User updated successfully");
    } catch (error) {
        res.status(500).send("Error updating user. Error: " + error);
    }
});

// Feed API - GET /feed - get all users from db
app.get("/feed", async (req, res) => {
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

app.post("/signup", async (req, res) => {
    const userObj = req.body;
    const user = new User(userObj);

    try {
        await user.save();
        res.send("User added successfully");
    } catch (error) {
        res.status(500).send("User saving user. Error: " + error.message);
    }

});

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong");
    }
});


