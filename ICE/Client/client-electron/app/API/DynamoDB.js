const AWS = require('aws-sdk')
require('dotenv').config()
const { v4: uuid } = require('uuid');

AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

class DynamoDB {
    #dynamoDB
    #dbName

    constructor() {
        this.#dynamoDB = new AWS.DynamoDB()
        this.#dbName = "Middleware_Musiques"
    }

    async selectAllFromDB() {

        return this.#executeCmd(`SELECT * FROM ${this.#dbName}`)
    }

    async addToDb(Album, Artist, SongTitle, Duration, Cover, Favorite) {
        const id = uuid().substr(0,23)
        return this.#executeCmd(
            `INSERT INTO ${this.#dbName} VALUE ({
                    'id': '${id}', 
                    'Album': '${Album}', 
                    'Artist': '${Artist}', 
                    'Duration': '${Duration}', 
                    'Favorite': '${Favorite}', 
                    'Cover': '${Cover}', 
                    'SongTitle': '${SongTitle}'
                    });`
        )
    }

    async deleteFromDbById(id) {
        return this.#executeCmd(`DELETE FROM ${this.#dbName} WHERE id = '${id}';`)
    }

    async selectSongFromDbById(id) {
        return this.#executeCmd(`SELECT * FROM ${this.#dbName} WHERE id = '${id}';`)
    }

    async selectSongFromDbByTitle(title) {
        return this.#executeCmd(`SELECT * FROM ${this.#dbName} WHERE SongTitle = '${title}';`)
    }

    async updateSongInDbById(id, Album, Artist, SongTitle, Duration, Cover, Favorite) {
        return this.#executeCmd(
            `UPDATE ${this.#dbName} SET 
            Album = '${Album}', 
            Artist = '${Artist}', 
            Duration = '${Duration}', 
            Favorite = '${Favorite}', 
            Cover = '${Cover}', 
            SongTitle = '${SongTitle}'
            WHERE id = '${id}';`
        )
    }

    #executeCmd(cmd) {
        return new Promise((resolve, reject) => {
            this.#dynamoDB.executeStatement({
                Statement: cmd,
            }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

module.exports = DynamoDB
