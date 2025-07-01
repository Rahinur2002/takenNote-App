
document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.querySelector('.save-btn');
    const deletebtn = document.querySelector('.delete-btn');
    const textarea = document.querySelector('textarea');
    const notesContainer = document.getElementById('notes');
    const titleInput = document.querySelector(".note-title-input");
    
    saveBtn.addEventListener('click', function() {
        const noteTitle = titleInput.value.trim();
        const noteText = textarea.value.trim();
        if (noteText) {
            addNote(noteTitle, noteText);
            textarea.value = '';
            titleInput.value = '';
        }
    });

    deletebtn.addEventListener('click', function() {
        const allNotes = document.querySelectorAll('.note');
        allNotes.forEach(note => note.remove());
});
    
    function addNote(title, text) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
        <h1>${title ? title : `untitled`}</h3>
            <p>${text}</p>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
            <button class="edit-btn"> Edit </button>
            <button class="save-btn">Save</button>

        `;
        notesContainer.prepend(noteElement);
        
        // Add delete functionality
        noteElement.querySelector('.delete-btn').addEventListener('click', function() {
            noteElement.remove();
        });

        noteElement.querySelector('.edit-btn').addEventListener('click', function() {
            const noteText = noteElement.querySelector('p');
            noteText.contentEditable = "true";
            noteText.focus();
        });
        saveBtn.addEventListener('click', function() {
        noteText.contentEditable = "false";
        saveBtn.style.display = "none";
        editBtn.style.display = "inline-block";
    });
    }


});
