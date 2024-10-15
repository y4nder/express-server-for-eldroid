const CreateUser = require("../use-cases/CreateUser");
const GetAllUsers = require("../use-cases/GetAllUsers");

class UserController {
    /**
     *
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(req, res) {
        console.log("hello from create user");
        const { username, email, password } = req.body; // Destructure the user object

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required." });
        }

        const createUser = new CreateUser(this.userRepository);
        try {
            const c = { username: username, email: email, password: password };
            const user = await createUser.execute(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUser(req, res) {
        console.log("hello from get single user");
        const username = req.query.username;
        console.log(username);

        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const user = await this.userRepository.findByUserName(username);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log(user);
        res.status(200).json(user);
    }

    async getAllUsers(req, res) {
        console.log("hello from get all users");
        const getAllUsers = new GetAllUsers(this.userRepository);
        const users = await getAllUsers.execute();
        console.log(users);
        res.status(201).json(users);
    }
}

module.exports = UserController;
