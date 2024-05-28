const notes = require('express').Router();
const notesHTML = require('../public/notes.html')

notes.get('/', (req, res) => res.json(notesHTML) )

module.exports = notes;