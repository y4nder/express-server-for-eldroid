const express = require("express");
const UserRepository = require("../repositories/UserRepository");
const db = require("../services/db");

const router = express.Router();
const userRepository = new UserRepository(db);

router.post("/login", async (req, res) => {
    console.log("hello from login");
    const { username, password } = req.body;
    const user = await userRepository.findByUserName(username);
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = password === user.password;
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json(user);
});

module.exports = router;
