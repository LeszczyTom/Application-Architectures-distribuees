const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

const dynamoDB = new AWS.DynamoDB()
const dbName = "Middleware_Musiques"

export async function selectAllFromDB() {
    await dynamoDB
        .executeStatement({
            Statement: `SELECT * FROM ${dbName}`,
        })
        .promise()
        .then(data => {
            console.log(data && data.Items)
        })
}

export async function addToDb(id, Album, Artist, SongTitle, Duration, Cover, Favorite) {
    const cmd = `INSERT INTO ${dbName} VALUE ({
                                                'id': '${id}', 
                                                'Album': '${Album}', 
                                                'Artist': '${Artist}', 
                                                'Duration': '${Duration}', 
                                                'Favorite': '${Favorite}', 
                                                'Cover': '${Cover}', 
                                                'SongTitle': '${SongTitle}'
                                                });`
    await dynamoDB
        .executeStatement({
            Statement: cmd
        }).promise()
        .then(() => {
            console.log("Added to DB")
        })
}

export async function deleteFromDb(id) {
    const cmd = `DELETE FROM ${dbName} WHERE id = '${id}';`
    console.log(cmd)
    await dynamoDB
        .executeStatement({
            Statement: cmd
        }).promise()
        .then(() => {
            console.log("Deleted from DB")
        })
}

export async function selectSongFromDbById(id) {
    const cmd = `SELECT * FROM ${dbName} WHERE id = '${id}';`
    await dynamoDB
        .executeStatement({
            Statement: cmd
        }).promise()
        .then(data => {
            console.log(data && data.Items)
        })
}

export async function selectSongFromDbByTitle(title) {
    const cmd = `SELECT * FROM ${dbName} WHERE SongTitle = '${title}';`
    await dynamoDB
        .executeStatement({
            Statement: cmd
        }).promise()
        .then(data => {
            console.log(data && data.Items)
        })
}

//selectSongFromDbByTitle()
//addToDb("4", "Album", "Artist", "test", "Duration", "Cover", "Favorite")

//selectAllFromDB()

//deleteFromDb("1")

//selectAllFromDB()
