const notes = require('express').Router();
const notesDB = require('../db/db.json')


notes.get('/', (req, res) => res.json(notesDB))

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    const newNote = {
        title,
        text
    };
})

module.exports = notes;