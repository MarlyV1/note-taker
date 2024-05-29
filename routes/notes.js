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

    // console.log(newNote);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        err ? console.error(err) : console.log(data);
        const parsedData = JSON.parse(data);
        parsedData.push(newNote)
        console.log(parsedData);
    })
    return res.json(newNote);
})

module.exports = notes;