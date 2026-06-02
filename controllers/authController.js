const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await User.create(userData);
        const token = generateToken(user);
        res.status(201).json({
            sucess: "User Created succesfully.",
            token,
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(400).json({
            error: "Failed to create the user."
        });
        console.error("Failed to create the user", error);
    }
}

const authenticateUser = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ error: "Invalid username or password" });

        const correctPassword = await user.isCorrectPassword(req.body.password);
        if (!correctPassword) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        token = generateToken(user);
        res.status(200).json({
            token,
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
        console.error(error);
    }
}

module.exports = { createUser, authenticateUser };