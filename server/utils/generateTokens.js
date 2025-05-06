const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: `${process.env.JWT_ACCESS_EXPIRY}` });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: `${process.env.JWT_REFRESH_EXPIRY}` });
};

module.exports = { generateAccessToken, generateRefreshToken };
