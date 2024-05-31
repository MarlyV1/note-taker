const router = require('express').Router();
const notesRouter = require('./notes');

//Route for the notes
router.use('/notes', notesRouter);

module.exports = router;