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

app.post("/signup", async (req, res) => {
    const userObj = req.body;
    const user = new User(userObj);

    try {
        await user.save();
        res.send("User added successfully");
    } catch (error) {
        res.status(500).send("User addition failed. Error: ", error.message);
    }

});

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong");
    }
});


