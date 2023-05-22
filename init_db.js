const sqlite3 = require('sqlite3').verbose();

// Open a database handle
let db = new sqlite3.Database('./voting.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the voting database.');
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users(uuid TEXT PRIMARY KEY, username TEXT)', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Created table users');
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});

