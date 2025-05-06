const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const user = await User.create({ name, email, password });
    return res.status(201).json({
        message: "Registered successfully"
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);


    const options = {
        httpOnly: true,
        secure: false
    }


    return res
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .status(200).json({
            message: "Logged in successfully",
            accessToken
        });

};

exports.refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        console.log("No refresh token found in cookies", req.cookies);
        return res.status(401).json({
            message: "No refresh token"
        });
    }
    const decoded_token = jwt.verify(token, "multifold_auth_refresh_secret");
    console.log("Decoded refresh token", decoded_token);
    if (!decoded_token) {
        return res.status(403).json({
            message: "Invalid refresh token"
        });
    }


    const accessToken = generateAccessToken(decoded_token.userId);

    const refreshToken = generateRefreshToken(decoded_token.userId);

    const options = {
        httpOnly: true,
        secure: false,
    }

    return res.cookie("refreshToken", refreshToken, options).json({
        accessToken
    })

};

exports.logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
};

exports.protected = async (req, res) => {
    const user = await User.findById(req.userId);
    res.json({ message: `Hello user ${user.name}` });
};
