const express = require('express')
const dynamoDB = require("./DynamoDB");

const app = express()
const cors = require('cors')

app.use(cors())

const db = new dynamoDB()

app.get('/selectAllFromDB', (req,res) => {
    db.selectAllFromDB().then(data => res.send(data))
})

app.get('/selectSongFromDbById/:id', (req,res) => {
    db.selectSongFromDbById(req.params.id).then(data => res.send(data))
})

app.get('/selectSongFromDbByTitle/:title', (req,res) => {
    db.selectSongFromDbByTitle(req.params.title).then(data => res.send(data))
})

app.get('/deleteFromDbById/:id', (req,res) => {
    db.deleteFromDbById(req.params.id).then(data => res.send(data))
})

app.get('/addToDb', (req,res) => {
    //id, Album, Artist, SongTitle, Duration, Cover, Favorite
    //http://localhost:2222/addToDb?album=Album&artist=Artist&duration=Duration&favorite=True&cover=Cover&title=test%20eee%20rr
    db.addToDb(req.query.album, req.query.artist, req.query.title, req.query.duration, req.query.cover, req.query.favorite).then(data => res.send(data))
})

app.get('/test', (req,res) => {
    res.send("test")
})

app.listen(2222, () => {
    console.log("Serveur à l'écoute sur le port 2222")
})
