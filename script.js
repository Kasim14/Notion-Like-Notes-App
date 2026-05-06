
lucide.createIcons();
var addBtn = document.querySelector(".addBtn");
var noteContainer = document.querySelector(".noteContainer");
var listNotes = document.querySelector(".list-notes ul");
var selectedNoteIndex = null;
var moon = document.querySelector("#moon");
var sun = document.querySelector("#sun");

// Function to load theme preference from localStorage
function loadTheme() {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

// Load saved theme when page loads
loadTheme();

// Moon button toggles dark mode and saves preference
moon.addEventListener("click", function() {
    document.body.classList.add("dark");
    // Save dark theme preference to localStorage
    localStorage.setItem('theme', 'dark');
});

// Sun button toggles light mode and saves preference
sun.addEventListener("click", function() {
    document.body.classList.remove("dark");
    // Save light theme preference to localStorage
    localStorage.setItem('theme', 'light');
});


function loadNotes(){
    var savedNotes = localStorage.getItem('notes');
    if(savedNotes){
        return JSON.parse(savedNotes);
    }
    return [
        {
            title: "First Note",    
            content: "This is the content of the first note."
        },
        {
            title: "Second Note",
            content: "This is the content of the second note."
        }
    ];
}

var notes = loadNotes();


function saveNotes(){
    localStorage.setItem('notes', JSON.stringify(notes));
}



function addNoteClickEvents() {
    var noteItems = document.querySelectorAll(".list-notes ul li");
    noteItems.forEach(item => {
        item.addEventListener("click", function() {
            selectedNoteIndex = this.dataset.index;
            showNote(selectedNoteIndex);
        });
    });

}

function showNote(index) {
    var note = notes[index];
    noteContainer.innerHTML = `
        <div class="content readonly-note">
            <input type="text" value="${note.title}" disabled />
            <textarea disabled>${note.content}</textarea>
        </div>
        <div class="action-buttons">
            <button class="edit-btn" type="button">Edit</button>
            <button class="delete-btn" type="button">Delete</button>
        </div>
    `;

    noteContainer.querySelector(".edit-btn").addEventListener("click", function() {
        showEditForm(index);
    });

    noteContainer.querySelector(".delete-btn").addEventListener("click", function() {
        deleteNote(index);
    });
}

function showEditForm(index) {
    var note = notes[index];
    noteContainer.innerHTML = `
        <form class="edit-form">
            <div class="content">
                <input type="text" class="title" value="${note.title}" />
                <textarea>${note.content}</textarea>
                <div class="btns">
                    <button class="save-btn" type="submit">Save</button>
                    <button class="cancel-btn" type="button">Cancel</button>
                </div>
            </div>
        </form>
    `;

    var form = noteContainer.querySelector("form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        var title = form.querySelector(".title").value;
        var content = form.querySelector("textarea").value;
        notes[index] = { title, content };

        saveNotes();

        renderNotes();
        showNote(index);
    });

    noteContainer.querySelector(".cancel-btn").addEventListener("click", function() {
        showNote(index);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    selectedNoteIndex = null;
    renderNotes();
    noteContainer.innerHTML = "";
}

addBtn.addEventListener("click", function() {
    noteContainer.innerHTML = `
        <form>
            <div class="content">
                <input type="text" placeholder="Title" class="title" />
                <textarea placeholder="Content"></textarea>
                <div class="btns">
                    <button class="save-btn" type="submit">Save</button>
                    <button class="cancel-btn" type="button">Cancel</button>
                </div>
            </div>
        </form>
    `;

    var form = noteContainer.querySelector("form");
    form.addEventListener("submit", handleSubmit);
    noteContainer.querySelector(".cancel-btn").addEventListener("click", function() {
        noteContainer.innerHTML = "";
    });
});

const handleSubmit = (e) => {
    e.preventDefault();
    var title = e.target.querySelector(".title").value;
    var content = e.target.querySelector("textarea").value;
    notes.push({ title, content });
    e.target.reset();
    saveNotes();
    renderNotes();
};

const renderNotes = () => {
    listNotes.innerHTML = "";
    notes.forEach((note, index) => {
        listNotes.innerHTML += `
            <li data-index="${index}">
                <div class="note-title">${note.title}</div>
            </li>
        `;
    });
    addNoteClickEvents();
};

renderNotes();






// lucide.createIcons();
// var addBtn = document.querySelector(".addBtn");
// var noteContainer = document.querySelector(".noteContainer");
// var listNotes = document.querySelector(".list-notes ul");
// var selectedNoteIndex = null;



// // Function to load notes from localStorage
// // If no notes exist in localStorage, return default sample notes
// function loadNotes() {
//     // Try to get saved notes from browser's localStorage
//     var savedNotes = localStorage.getItem('notes');

//     // If notes exist in localStorage, parse the JSON string back to array
//     if (savedNotes) {
//         return JSON.parse(savedNotes);
//     }

//     // If no notes in localStorage, return default sample notes
//     return [
//         {
//             title: "First Note",
//             content: "This is the content of the first note."
//         },
//         {
//             title: "Second Note",
//             content: "This is the content of the second note."
//         }
//     ];
// }

// // Function to save notes to localStorage
// // This ensures notes persist between browser sessions
// function saveNotes() {
//     // Convert notes array to JSON string and save to localStorage
//     localStorage.setItem('notes', JSON.stringify(notes));
// }

// // Load notes from localStorage when the page loads
// // This replaces the hardcoded notes array
// var notes = loadNotes();

// function addNoteClickEvents() {
//     var noteItems = document.querySelectorAll(".list-notes ul li");
//     noteItems.forEach(item => {
//         item.addEventListener("click", function() {
//             selectedNoteIndex = this.dataset.index;
//             showNote(selectedNoteIndex);
//         });
//     });
// }

// function showNote(index) {
//     var note = notes[index];
//     noteContainer.innerHTML = `
//         <div class="content readonly-note">
//             <input type="text" value="${note.title}" disabled />
//             <textarea disabled>${note.content}</textarea>
//         </div>
//         <div class="action-buttons">
//             <button class="edit-btn" type="button">Edit</button>
//             <button class="delete-btn" type="button">Delete</button>
//         </div>
//     `;

//     noteContainer.querySelector(".edit-btn").addEventListener("click", function() {
//         showEditForm(index);
//     });

//     noteContainer.querySelector(".delete-btn").addEventListener("click", function() {
//         deleteNote(index);
//     });
// }

// function showEditForm(index) {
//     var note = notes[index];
//     noteContainer.innerHTML = `
//         <form class="edit-form">
//             <div class="content">
//                 <input type="text" class="title" value="${note.title}" />
//                 <textarea>${note.content}</textarea>
//                 <div class="btns">
//                     <button class="save-btn" type="submit">Save</button>
//                     <button class="cancel-btn" type="button">Cancel</button>
//                 </div>
//             </div>
//         </form>
//     `;

//     var form = noteContainer.querySelector("form");
//     form.addEventListener("submit", function(e) {
//         e.preventDefault();
//         var title = form.querySelector(".title").value;
//         var content = form.querySelector("textarea").value;
//         notes[index] = { title, content };

//         // Save notes to localStorage after editing a note
//         saveNotes();

//         renderNotes();
//         showNote(index);
//     });

//     noteContainer.querySelector(".cancel-btn").addEventListener("click", function() {
//         showNote(index);
//     });
// }

// function deleteNote(index) {
//     notes.splice(index, 1);
//     selectedNoteIndex = null;

//     // Save notes to localStorage after deleting a note
//     saveNotes();

//     renderNotes();
//     noteContainer.innerHTML = "";
// }

// addBtn.addEventListener("click", function() {
//     noteContainer.innerHTML = `
//         <form>
//             <div class="content">
//                 <input type="text" placeholder="Title" class="title" />
//                 <textarea placeholder="Content"></textarea>
//                 <div class="btns">
//                     <button class="save-btn" type="submit">Save</button>
//                     <button class="cancel-btn" type="button">Cancel</button>
//                 </div>
//             </div>
//         </form>
//     `;

//     var form = noteContainer.querySelector("form");
//     form.addEventListener("submit", handleSubmit);
//     noteContainer.querySelector(".cancel-btn").addEventListener("click", function() {
//         noteContainer.innerHTML = "";
//     });
// });

// const handleSubmit = (e) => {
//     e.preventDefault();
//     var title = e.target.querySelector(".title").value;
//     var content = e.target.querySelector("textarea").value;
//     notes.push({ title, content });

//     // Save notes to localStorage after adding a new note
//     saveNotes();

//     e.target.reset();
//     renderNotes();
// };

// const renderNotes = () => {
//     listNotes.innerHTML = "";
//     notes.forEach((note, index) => {
//         listNotes.innerHTML += `
//             <li data-index="${index}">
//                 <div class="note-title">${note.title}</div>
//             </li>
//         `;
//     });
//     addNoteClickEvents();
// };

// renderNotes();




