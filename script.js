const btn = document.querySelector("#addBtn");
const main = document.querySelector("#main");
btn.addEventListener("click", () => {
  addNote();
});

const saveNote = () => {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];

  notes.forEach((note) => data.push(note.value));
  //   console.log(data);
  if (data.length === 0) return localStorage.removeItem("notes");
  localStorage.setItem("notes", JSON.stringify(data));
};

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
        <div class="tool__bar">
          <i class="save fa-solid fa-floppy-disk"></i>
          <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea>${text}</textarea>
    `;

  main.appendChild(note);
  note.querySelector(".trash").addEventListener("click", () => {
    note.remove();
    saveNote();
  });

  note.querySelector(".save").addEventListener("click", () => {
    saveNote();
  });

  note.querySelector("textarea").addEventListener("focusout", () => {
    saveNote();
  });
};

(function () {
  const lsNotes = JSON.parse(localStorage.getItem("notes"));
  if (!lsNotes) addNote();
  console.log(lsNotes);
  lsNotes.forEach((lsnote) => {
    addNote(lsnote);
  });
})();
