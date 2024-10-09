const express = require("express");
const UserController = require("../controllers/UserController");
const UserRepository = require("../repositories/UserRepository");
const db = require("../services/db");

const router = express.Router();

const userRepository = new UserRepository(db);
const userController = new UserController(userRepository);

router.get("/users/user", (req, res) => userController.getUser(req, res));
router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.post("/users", (req, res) => userController.createUser(req, res));

module.exports = router;
