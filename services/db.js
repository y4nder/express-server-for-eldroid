const User = require("../models/User");
const users = [new User({ username: "leander", password: "123" }), new User({ username: "admin", password: "123" }), new User({ username: "lubguban", password: "123" })];

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = "./sqlite/AppDb.db";

//mock db
// const db = {
//     insert: (user) => {
//         users.push(user);
//         console.log(users);
//         return user;
//     },
//     find: (query) => {
//         return users.find((user) => user.username === query.username);
//     },
//     findById: (query) => {
//         return users.find((user) => user.id === query.id);
//     },
//     all: () => {
//         return users;
//     },
// };

let sqliteDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database: " + err.message);
    } else {
        console.log("Connected to the SQLite database.");

        // Create the users table if it doesn't exist
        sqliteDb.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )`);
    }
});

const sqliteDBInstance = {
    insert: (user, callback) => {
        const { username, email, password } = user;
        sqliteDb.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, password], function (err) {
            if (err) {
                return callback(err, null);
            }
            callback(null, { id: this.lastID, username, email, password });
        });
    },
    find: (query, callback) => {
        sqliteDb.get(`SELECT * FROM users WHERE username = ?`, [query.username], (err, row) => {
            if (err) return callback(err, null);
            callback(null, row);
        });
    },

    findById: (id, callback) => {
        sqliteDb.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
            if (err) return callback(err, null);
            callback(null, row);
        });
    },

    all: (callback) => {
        sqliteDb.all(`SELECT * FROM users`, [], (err, rows) => {
            if (callback && typeof callback === "function") {
                if (err) {
                    return callback(err, null);
                }
                callback(null, rows);
            } else {
                console.error("No valid callback function provided for all");
            }
        });
    },
};

module.exports = sqliteDBInstance;
