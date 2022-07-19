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
app.get('/api/notes', (req, res) => {
    try{
        const data = fs.readFileSync('db/db.json', 'utf-8')
        // console.log('data is', data)
        res.json(JSON.parse(data))
        // console.log(JSON.parse(data))
    }
    catch(err){
        res.json(err)
    }
})
app.post('/api/notes', ({ body }, res) => {
    let id = uniqueId();
    let title = body.title
    let noteContent = body.text
    let noteBundle = {
        id:id,
        title: title,
        text: noteContent}
    notes.push(noteBundle)
    // console.log(notes)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes), ()=>{
        res.json(noteBundle)
    })
})
app.delete('/api/notes/:id', (req, res) => {
    let remainingNotes = notes.filter(noteBundle => noteBundle.id != req.params.id);
    console.log(remainingNotes)
    fs.writeFile('./db/db.json', JSON.stringify(remainingNotes), ()=>{
        res.json(remainingNotes)
    })
})
app.listen(PORT, ()=>{ console.log(`API server is listening on Port:${PORT}`)})