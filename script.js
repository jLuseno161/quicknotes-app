// ---------- Elements (selected with querySelector) ----------
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");

const STORAGE_KEY = "quicknotes-notes";
const MAX_LENGTH = 200;

// ---------- Task 5: storage ----------
function loadNotes() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Notes are stored as objects: { id, text, category, createdAt }
let notes = loadNotes();

// ---------- Task 4: count message ----------
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// ---------- Task 3: render ----------
function createNoteCard(note) {
  const li = document.createElement("li");
  li.classList.add("note-card", `category-${note.category}`);

  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text;

  const meta = document.createElement("div");
  meta.classList.add("note-meta");

  const category = document.createElement("span");
  category.classList.add("note-category");
  category.textContent =
    note.category.charAt(0).toUpperCase() + note.category.slice(1);

  const date = document.createElement("span");
  date.textContent = note.createdAt;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteNote(note.id);
  });

  meta.append(category, date, deleteBtn);
  li.append(text, meta);
  return li;
}

function render() {
  const term = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(term);
  });

  notesList.replaceChildren();

  if (visibleNotes.length === 0 && term !== "") {
    const empty = document.createElement("li");
    empty.classList.add("empty-message");
    empty.textContent = "No notes match your search.";
    notesList.append(empty);
  } else {
    visibleNotes.forEach(function (note) {
      notesList.append(createNoteCard(note));
    });
  }

  updateCount();
  clearAllBtn.hidden = notes.length === 0;
}

// ---------- Task 3 and 4: add (with validation) ----------
function addNote(event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  const note = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };

  notes.unshift(note);
  saveNotes();
  errorMessage.textContent = "";
  noteInput.value = "";
  noteInput.focus();
  render();
}

// ---------- Task 4: delete ----------
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// ---------- Task 5: clear all ----------
function clearAllNotes() {
  if (notes.length === 0) {
    return;
  }
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    searchInput.value = "";
    render();
  }
}

// ---------- Events and first render ----------
noteForm.addEventListener("submit", addNote);
searchInput.addEventListener("input", render);
clearAllBtn.addEventListener("click", clearAllNotes);

render();
