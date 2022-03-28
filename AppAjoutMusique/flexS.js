const { Index, Document } = require("flexsearch");
const fs = require('fs').promises;

const doc = new Document("../db.json");
const index = new Index("performance");

/*const dbJson = JSON.parse(require('fs').readFileSync('../db.json').toString());
console.log(dbJson)
index.add(0, )*/