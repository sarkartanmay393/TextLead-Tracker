let input_el = document.getElementById("input_el");
let ul_el = document.getElementById("ul_el");

let saveInputButton = document.getElementById("save-input-btn");
let saveLinkButton = document.getElementById("save-link-btn");
let clearAllButton = document.getElementById("clear-all-btn");


let inputsList = [];


saveInputButton.addEventListener("click", saveInput);
saveLinkButton.addEventListener("click", saveLink);
clearAllButton.addEventListener("click", clearAll);
input_el.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        saveInput();
    }
});

// To save written text input in list.
function saveInput() {
    if (input_el.value == "") {
        return
    }
    inputsList.push(input_el.value);
    input_el.value = "";

    updateListInputs();
}

// To save link directly from current tab.
function saveLink() {

}


// To update list inputs on screen.
function updateListInputs() {
    ul_el.innerHTML = "";
    for (let i = 0; i < inputsList.length; i++) {
        ul_el.innerHTML += `<li id="${i}">${inputsList[i]}</li>`;
    }
}

// To clear all inputs.
function clearAll() {
    inputsList = [];
    updateListInputs();
}