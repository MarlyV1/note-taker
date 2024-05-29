const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRouter = require('./routes');
const path = require('path');

//Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api', apiRouter);

app.use(express.static('public'));

//GET route for the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//Fallback route made for when a user attempts to visit a nonexistent route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});