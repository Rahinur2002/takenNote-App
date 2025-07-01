document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.querySelector('.save-btn');
    const textarea = document.querySelector('textarea');
    const notesContainer = document.getElementById('notes');
    
    saveBtn.addEventListener('click', function() {
        const noteText = textarea.value.trim();
        if (noteText) {
            addNote(noteText);
            textarea.value = '';
        }
    });
    
    function addNote(text) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <p>${text}</p>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        notesContainer.prepend(noteElement);
        
        // Add delete functionality
        noteElement.querySelector('.delete-btn').addEventListener('click', function() {
            noteElement.remove();
        });
    }
});