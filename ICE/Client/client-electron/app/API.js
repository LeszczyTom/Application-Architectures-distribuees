const express = require('express')
const {selectSongFromDbById, selectSongFromDbByTitle, deleteFromDb, addToDb, selectAllFromDB} = require("./DynamoDB");

const app = express()

app.listen(2222, () => {
    console.log("Serveur à l'écoute")
})

app.get('/selectAllFromDB', (req,res) => {
    selectAllFromDB().then(data => res.send(data))
})

app.get('/selectSongFromDbById', (req,res) => {
    selectSongFromDbById(req.query.id).then(data => res.send(data))
})

app.get('/selectSongFromDbByTitle', (req,res) => {
    selectSongFromDbByTitle(req.query.id, req.query.name, req.query.age).then(data => res.send(data))
})

app.get('/deleteFromDb', (req,res) => {
    deleteFromDb(req.query.id, req.query.name, req.query.age).then()
})

app.get('/addToDb', (req,res) => {
    addToDb(req.query.id, req.query.name, req.query.age).then()
})

//TODO: verifier le fonctionnement

