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

                return resolve(rows)
            })
        })
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end( error => {
                if (error) {
                    return reject(error)
                }

                return resolve()
            })
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
