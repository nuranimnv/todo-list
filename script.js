const input = document.querySelector("input");
const addBtn = document.querySelector("button");
const inputContainer = document.querySelector(".input-container");
const noteContainer = document.querySelector(".note-container");
const resetBtn = document.getElementById("reset");
const sort = document.querySelector("#sort");
let notes = [];
let isInputVisible = true;
let isSorted = false;

addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  if (isInputVisible) {
    if (input.value !== "") {
      notes.push({ text: input.value, completed: false });
      addNote();
      input.value = "";
      isInputVisible = false;
      inputContainer.style.display = "none";
    } else {
      alert("Please fill in the 'input'!");
    }
  } else {
    inputContainer.style.display = "flex";
    isInputVisible = true;
  }
}

function addNote() {
  noteContainer.innerHTML = "";
  notes.forEach((noteObj, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.draggable = true;
    if (noteObj.completed) noteDiv.classList.add("completed");

    const note = document.createElement("p");
    note.textContent = `${index + 1}) ${noteObj.text}`;

    const editBtn = document.createElement("i");
    editBtn.classList.add("ri-edit-line");

    const removeBtn = document.createElement("i");
    removeBtn.classList.add("ri-close-line");

    noteDiv.append(note, editBtn, removeBtn);
    noteContainer.append(noteDiv);

    note.addEventListener("click", () => {
      noteObj.completed = !noteObj.completed;
      noteDiv.classList.toggle("completed");
    });

    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit your note:", noteObj.text);
      if (newText !== null) {
        noteObj.text = newText;
        addNote();
      }
    });

    removeBtn.addEventListener("click", () => {
      notes.splice(index, 1);
      addNote();
      if (notes.length === 0) {
        noteContainer.style.borderColor = "transparent";
        inputContainer.style.display = "flex";
      }
    });

    noteDiv.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", index);
    });
    noteDiv.addEventListener("dragover", (e) => e.preventDefault());
    noteDiv.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedIndex = e.dataTransfer.getData("text/plain");
      const droppedIndex = index;
      [notes[draggedIndex], notes[droppedIndex]] = [
        notes[droppedIndex],
        notes[draggedIndex],
      ];
      addNote();
    });
  });
  noteContainer.style.borderColor = "#c4c4c4";
}

resetBtn.addEventListener("click", () => {
  input.value = "";
});

sort.addEventListener("click", () => {
  if (notes.length) {
    notes.sort((a, b) =>
      isSorted ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
    );
    isSorted = !isSorted;
    sort.style.transform = isSorted ? "rotate(180deg)" : "rotate(0deg)";
    addNote();
  } else {
    alert("There is no any todo...");
  }
});
