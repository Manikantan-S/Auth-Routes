const { hashSync, compareSync } = require('bcrypt');
const UserModel = require('./config/database');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error("Please provide all required fields.");
        }

        const user = new UserModel({
            name,
            email,
            password: hashSync(password, 10),
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("Please provide both email and password.");
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Could not find the user.",
            });
        }

        if (!compareSync(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const payload = {
            name: user.name,
            id: user._id,
        };

        const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        });
    }
};

module.exports = { register, login };
