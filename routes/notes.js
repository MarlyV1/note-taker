const notes = require('express').Router();
const notesDB = require('../db/db.json')
const fs = require('fs');
const { v4: uuid } = require('uuid');

notes.get('/', (req, res) => res.json(notesDB))

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

function readAndAppendFile(newNote) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        err ? console.error(err) : console.log(data);
        const parsedData = JSON.parse(data);
        parsedData.push(newNote)
        console.log(parsedData);

        writeFile('./db/db.json', parsedData)
    });
}

function writeFile(file, data) {
    fs.writeFile(file, JSON.stringify(data, null, 4), (err) => err ? console.error(err) : console.log("Successfully wrote to the file"))
}


module.exports = notes;