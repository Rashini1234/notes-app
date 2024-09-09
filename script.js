const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".create-btn");
const clearBtn = document.querySelector(".clear-btn");

// Function to display notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    attachDeleteListeners(); // Attach event listeners to the delete buttons after rendering notes
}

// Function to update localStorage with the current notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Display notes when the page loads
showNotes();

// Function to attach event listeners to delete buttons
function attachDeleteListeners() {
    const deleteButtons = notesContainer.querySelectorAll("img");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            btn.parentElement.remove();
            updateStorage();
        });
    });

    const noteElements = notesContainer.querySelectorAll(".input-box");
    noteElements.forEach(note => {
        note.addEventListener("input", function() {
            updateStorage();
        });
    });
}

// Add a new note when the create button is clicked
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    // Attach delete listener to the new note
    img.addEventListener("click", function() {
        img.parentElement.remove();
        updateStorage();
    });

    inputBox.addEventListener("input", function() {
        updateStorage();
    });

    updateStorage(); // Save the new note to localStorage
});

// Clear notes when the clear button is clicked
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("notes");  // Clear notes from localStorage
    notesContainer.innerHTML = "";  // Clear notes from the DOM
});

document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})
