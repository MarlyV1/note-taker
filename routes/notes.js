const notes = require('express').Router();
const notesDB = require('../db/db.json')
const fs = require('fs');
const { v4: uuid } = require('uuid');

//GET route to retrieve all notes
notes.get('/', (req, res) => res.json(notesDB))

//POST route to add a new note
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        note_id: uuid()
    };

    readAndAppendFile(newNote);

    return res.json(newNote);
});

//Retrieves all notes then writes the new note to the file
function readAndAppendFile(newNote) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        err ? console.error(err) : console.log(data);
        const parsedData = JSON.parse(data);
        parsedData.push(newNote)
        console.log(parsedData);

    fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) => {
        err ? console.error(err) : console.log("Successfully wrote to the file")})
    });
};

notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) =>{
        err ? console.error(err) : console.log("success");

        const parsedData = JSON.parse(data);
        parsedData.filter(filteredData(parsedData, id))
        // console.log(parsedData)
    })
})


function filteredData(data, id) {
    data.forEach((e) => {
        console.log(e.note_id);
        console.log(e.note_id !== id);
    });
}















module.exports = notes;