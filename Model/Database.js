const mysql = require('mysql')

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (error, rows) => {
                if (error) {
                    return reject(error)
                }

                resolve(rows)
            })
        })
    }

    close() {
        return new Promise((resolve, reject) => {
            if (error) {
                return reject(error)
            }

            resolve()
        })
    }
}

Database.execute = function (config, callback) {
    const database = new Database(config)

    return callback(database).then(
        result => database.close().then(() => result),
        error => database.close().then(() => { throw error })
    )
}

module.exports = {
    Database
}
