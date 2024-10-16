const User = require("../models/User");
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        const user = new User(userData);
        if (!userData.username || !userData.password || !userData.email) {
            console.log("error");
            throw new Error("missing parameters");
        }

        let existingUser = await this.userRepository.findByUserName(userData.username);
        if (existingUser !== undefined) throw new Error("username already exists");

        existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser !== undefined) throw new Error("email already exists");

        return await this.userRepository.save(user);
    }
}

module.exports = CreateUser;
