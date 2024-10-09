require("dotenv").config();

const validateHeader = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // Check if the Authorization header exists
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    // Ensure the token is a Bearer token
    const tokenParts = authHeader.split(" ");
    if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = tokenParts[1];
    const validToken = process.env.API_KEY;

    // Check if the token matches the valid token
    if (token !== validToken) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

    // If the token is valid, proceed to the next middleware or route handler
    next();
};

module.exports = validateHeader;
