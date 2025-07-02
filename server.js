const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.json());

const NOTES_FILE = path.join(__dirname, 'notes.json');

// Helper to load notes from file
function loadNotes() {
    if (fs.existsSync(NOTES_FILE)) {
        return JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8'));
    }
    return [];
}

// Helper to save notes to file
function saveNotes(notes) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

let notes = loadNotes();
let id = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;

app.use(express.static(path.join(__dirname)));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const note = { id: id++, ...req.body };
    notes.push(note);
    saveNotes(notes);
    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id != req.params.id);
    saveNotes(notes);
    res.sendStatus(204);
});

app.listen(3000, () => console.log('Server running on port 3000'));