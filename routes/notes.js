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

// DELETE route to delete notes
notes.delete('/:id', (req, res) => {
    const id = req.params.id;

    readAndDeleteFile(id, res)
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


// //Retrieves all notes then deletes a note from the file
function readAndDeleteFile(id, res) {

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500); // Internal Server Error
            return;
            }     
               
        const parsedData = JSON.parse(data);
        const filteredData = parsedData.filter(item => item.note_id !== id);

    fs.writeFile('./db/db.json', JSON.stringify(filteredData, null, 4), 'utf-8', (err) => {
        if (err) {
        console.error(err);
        res.sendStatus(500); // Internal Server Error
        return;
        }
    })
    console.log("Note deleted successfully");
    })
}
    

module.exports = notes;