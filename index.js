const input_el = document.getElementById("input_el");
const ul_el = document.getElementById("ul_el");
const saveInputButton = document.getElementById("save-input-btn");
const saveLinkButton = document.getElementById("save-link-btn");
const clearAllButton = document.getElementById("clear-all-btn");

// parsing textlead list from localstorage.
const inputsListJSON = JSON.parse(localStorage.getItem("inputsList"));

// it stores every text lead.
let inputsList = [];

// conditons for leads loading
// it checks when our website first loads.
if (inputsListJSON) {
    inputsList = inputsListJSON;
    updateListInputs();
}

let copyBtn = document.getElementById("copy-text-btn");
let deleteBtn = document.getElementById("delete-text-btn");
let isMobile = false;

if (window.outerWidth <= 400) {
    isMobile = true;
}

if (inputsList.length > 0) {
    if (window.outerWidth > 400) {
        copyBtn.addEventListener("mouseout", outFuncC);
        copyBtn.addEventListener("click", copiedText(copyBtn.value));

        deleteBtn.addEventListener("mouseout", outFuncD);
        deleteBtn.addEventListener("click", deleteText(deleteBtn.value)); s
    }
}

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
    let tab = chrome.tabs.query({ active: true, lastFocusedWindow: true });
    console.log(tab);
}

let list_el = document.getElementById("list-item");
if (window.outerWidth <= 400) {
    document.getElementById("text-lead-el").addEventListener("click", copiedText(list_el.value));
}
document.getElementById("delete-lead-el").addEventListener("click", deleteText(list_el.value));

// To update list inputs on screen.
function updateListInputs() {
    let listItem = "";
    for (let i = 0; i < inputsList.length; i++) {
        if (inputsList[i] != "") {
            if (window.outerWidth <= 400) {
                listItem += `
                <li id="list-item" value="${i}">
                    <div class="list-item-el">
                        <p id="text-to-copy-${i}"> <a id="text-lead-el">${inputsList[i]}</a></p>
                        <button id="delete-text-btn-mobile">
                            <a id="delete-lead-el"><i class="fa fa-close"></i></a>
                        </button>
                     </div>
                </li>`
                    ;
            } else {
                listItem += `
                <li id="list-item" value="${i}">
                    <div class="list-item-el">
                        <p id="text-to-copy-${i}"> <a id="text-lead-el">${inputsList[i]}</a></p>
                        <div class="buttons-div list-item-btn-div">
                            <div class="tooltip">
                                <button id="copy-text-btn" value="${i}">
                                    <span class="tooltiptext copyTooltip" id="myTooltip">
                                        Copy to clipboard
                                    </span>
                                    Copy
                                </button>
                            </div>
                            <div class="tooltip">
                                <button id="delete-text-btn" value="${i}">
                                    <span class="tooltiptext deleteTooltip" id="myTooltip">
                                        Delete the lead
                                    </span>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </li>`
                    ;
            }
        }
    }
    ul_el.innerHTML = listItem;

    // putting all text leads in local storage.
    localStorage.setItem("inputsList", JSON.stringify(inputsList));
}

// To clear all inputs.
function clearAll() {
    inputsList = [];
    localStorage.clear();

    updateListInputs();
}

// Copy functionality.
function copiedText(id) {
    let temp = document.getElementById("text-to-copy-" + id);
    let docRange = document.createRange();
    docRange.selectNode(temp);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(docRange);

    document.execCommand('copy');
    window.getSelection().removeAllRanges();


    if (!isMobile) {
        let tooltip = document.getElementsByClassName("copyTooltip");
        tooltip.item(0).textContent = "Copied: " + temp.textContent;
    }
}

function deleteText(id) {
    let tempInputsList = [];
    inputsList.forEach(function (value, index) {
        if (!(index == id)) {
            tempInputsList.push(value);
        }
    });
    inputsList = tempInputsList;

    if (!isMobile) {
        let tooltip = document.getElementsByClassName("deleteTooltip");
        tooltip.item(0).textContent = "Deleted!";
    }

    updateListInputs();
}

function outFuncC() {
    let tooltip = document.getElementsByClassName("copyTooltip");
    tooltip.item(0).textContent = "Copy to clipboard";
}

function outFuncD() {
    var tooltip = document.getElementsByClassName("deleteTooltip");
    tooltip.item(0).textContent = "Delete the lead";
}