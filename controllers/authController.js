const User = require("../models/User");
const { generateToken } = require("../utils/auth");

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await User.create(userData);
        const token = generateToken(user);
        res.status(201).json({
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            token
        });

    } catch (error) {
        //console.error("Failed to create the user", error);
        console.log(error.code)
        console.log(error.errorResponse);
        if (error?.code === 11000) {
            const field = Object.keys(error.keyValue)[0];

            return res.status(400).json({
                error: `${field} already exists`,
            });
        }

        res.status(400).json({
            error: "Failed to create the user"
        });
    }
}

const authenticateUser = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ error: "Invalid email or password" });

        const correctPassword = await user.isCorrectPassword(req.body.password);
        if (!correctPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = generateToken(user);
        res.status(200).json({
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
        console.error(error);
    }
}

module.exports = { createUser, authenticateUser };