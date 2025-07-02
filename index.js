document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.querySelector(".save-btn");
  const deletebtn = document.querySelector(".delete-btn");
  const textarea = document.querySelector("textarea");
  const notesContainer = document.getElementById("notes");
  const titleInput = document.querySelector(".note-title-input");

  // Load saved notes from backend
  fetch("/api/notes")
    .then((response) => response.json())
    .then((notes) => {
      notes.forEach((note) => addNote(note.title, note.text));
    });

  saveBtn.addEventListener("click", function () {
    const noteTitle = titleInput.value.trim();
    const noteText = textarea.value.trim();
    if (noteText) {
      // Save to backend
      fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: noteTitle, text: noteText }),
      })
        .then((response) => response.json())
        .then((note) => {
          addNote(note.title, note.text);
          textarea.value = "";
          titleInput.value = "";
        });
    }
  });

  deletebtn.addEventListener("click", function () {
    const allNotes = document.querySelectorAll(".note");
    allNotes.forEach((note) => note.remove());
  });

  function addNote(title, text) {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
        <h1>${title ? title : `untitled`}</h1>
        <p>${text}</p>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
        <button class="edit-btn">Edit</button>
        <button class="save-btn">Save</button>
    `;
    notesContainer.prepend(noteElement);

    const noteText = noteElement.querySelector("p");
    const editBtn = noteElement.querySelector(".edit-btn");
    const saveBtn = noteElement.querySelector(".save-btn");

    // Delete functionality
    noteElement
      .querySelector(".delete-btn")
      .addEventListener("click", function () {
        noteElement.remove();
      });

    editBtn.addEventListener("click", function () {
      noteText.contentEditable = "true";
      noteText.focus();
      saveBtn.style.display = "inline-block";
      editBtn.style.display = "none";
    });

    saveBtn.addEventListener("click", function () {
      noteText.contentEditable = "false";
      saveBtn.style.display = "none";
      editBtn.style.display = "inline-block";
    });
  }
});
