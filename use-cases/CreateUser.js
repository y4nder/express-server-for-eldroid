const User = require("../models/User");
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        const user = new User(userData);
        if (!userData.username || !userData.password) {
            console.log("error");
            throw new Error("missing parameters");
        }
        return await this.userRepository.save(user);
    }
}

module.exports = CreateUser;
