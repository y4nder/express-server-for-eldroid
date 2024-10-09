const User = require("../models/User");
const users = [new User({ username: "leander", password: "123" })];

//mock db
const db = {
    insert: (user) => {
        users.push(user);
        console.log(users);
        return user;
    },
    find: (query) => {
        return users.find((user) => user.username === query.username);
    },
    all: () => {
        return users;
    },
};

module.exports = db;
