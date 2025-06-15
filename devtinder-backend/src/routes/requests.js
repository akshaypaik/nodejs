const express = require("express");
const { userAuth } = require("../middlewares/auth");

const connectionRequestsRouter = express.Router();

connectionRequestsRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    const { user } = req;

    res.send(`${user.firstname} send the connect request`);
});

module.exports = connectionRequestsRouter;