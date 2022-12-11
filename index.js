let input_el = document.getElementById("input-el");
let ul_el = document.getElementById("ul_el");

let saveInputButton = document.getElementById("save-input-btn");
let saveLinkButton = document.getElementById("save-link-btn");
let clearAllButton = document.getElementById("clear-all-btn");


let inputsList = [];


saveInputButton.addEventListener("click", saveInput);
saveLinkButton.addEventListener("click", () => { });
clearAllButton.addEventListener("click", clearAll);

// To save written text input in list.
function saveInput() {
    inputsList.push(input_el.innerText);
    updateListInputs();
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