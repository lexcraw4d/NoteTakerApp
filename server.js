const express = require('express')
const uniqueId = require('generate-unique-id')
const path = require('path')
const fs = require ('fs')


const PORT = process.env.PORT || 3001;
const app = express();

const notes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})



app.listen(PORT, ()=>{ console.log(`API server is listening on Port:${PORT}`)})