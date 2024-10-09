class GetAllUsers {
    /**
     *
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute() {
        return this.userRepository.getAllUserNames();
    }
}

module.exports = GetAllUsers;
