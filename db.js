const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./voting.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the voting database.');
});

function getUserUuid(username) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row && row.uuid) {
          resolve(row.uuid);
        } else {
          resolve(null); // Return null if uuid field is missing
        }
      }
    });
  });
}


function mapUserToUuid(uuid, username) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users(uuid, username) VALUES(?, ?)`, [uuid, username], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    getUserUuid,
    mapUserToUuid,
};

