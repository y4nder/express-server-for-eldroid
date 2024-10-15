class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async save(user) {
        return new Promise((resolve, reject) => {
            this.db.insert(user, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    async findByUserName(username) {
        return new Promise((resolve, reject) => {
            this.db.find({ username }, (err, user) => {
                if (err) {
                    return reject(err);
                }
                resolve(user);
            });
        });
    }

    async findById(id) {
        return new Promise((resolve, reject) => {
            this.db.findById(id, (err, user) => {
                if (err) {
                    return reject(err);
                }
                resolve(user);
            });
        });
    }

    async getAllUserNames() {
        return new Promise((resolve, reject) => {
            this.db.all((err, users) => {
                if (err) {
                    return reject(err);
                }
                resolve(users); //
            });
        });
    }
}

module.exports = UserRepository;
