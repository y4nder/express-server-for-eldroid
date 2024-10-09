class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async save(user) {
        return this.db.insert(user);
    }

    async findByUserName(username) {
        return this.db.find({ username });
    }

    async getAllUserNames() {
        return this.db.all();
    }
}

module.exports = UserRepository;
