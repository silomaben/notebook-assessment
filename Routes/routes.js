const {Router} = require('express');
const { createNewNote, fetchAllNotes, fetchOneNote, updateNote, deleteNote } = require('../Controllers/notebookController');

const notebookrouter = Router();

notebookrouter.post('/',createNewNote);
notebookrouter.get('/', fetchAllNotes);
notebookrouter.get('/:id',fetchOneNote);
notebookrouter.post('/:id',updateNote);
notebookrouter.delete('/:id', deleteNote);


module.exports={
    notebookrouter
}