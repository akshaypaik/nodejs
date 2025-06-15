const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");

const PORT = 4002;

const app = express();

// json parser
app.use(express.json());
// cookies
app.use(cookieParser());

connectDB().then(() => {
    console.log("DB connection established!");
    app.listen(PORT, () => {
        console.log("Devtinder app is listening on: ", PORT);
    });
}).catch((error) => {
    console.error("DB cannot be connected! ERROR: ", error);
});

// Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRequestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use(authRouter);
app.use(profileRouter);
app.use(connectionRequestsRouter);
app.use(userRouter);


app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong");
    }
});


