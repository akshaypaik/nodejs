const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Invalid token!");
        }

        const decodedToken = jwt.verify(token, "AkshayDev@2025");

        const { _id } = decodedToken;

        const user = await User.findOne({ _id: _id });
        if (!user) {
            throw new Error("User not found!");
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(403).send("Forbidden: " + error.message);
    }

}

module.exports = { userAuth };