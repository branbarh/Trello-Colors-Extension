// ==UserScript==
// @name         Trello Colors
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description  An extension that allows for more color options on Trello labels.
// @author       branbarh
// @match        *://*.trello.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

//  ======================================= MAIN UPDATE LOOP =======================================

window.addEventListener("load", function() {

  // Handle CSS rules:
  handleCSSRules();

  // Periodically check for new, unchecked labels and handle label input changes:
  setInterval(function() {
    handleLabelInput();
    handleLabels();
  }, 0);

});

// ===================================== CSS & LABEL FUNCTIONS =====================================

function handleCSSRules() {

  // Append a style element to the head of the document, to allow for pseudo elements and animations to be hidden later:
  let styleElm = document.createElement("style");
  document.head.appendChild(styleElm);

  let styleSheet = styleElm.sheet;

  // Insert CSS Rules:
  styleSheet.insertRule(`[data-hidepseudo=true]::before { display: none; }`);
  styleSheet.insertRule(`[data-hidepseudo=true] { padding-left: 8px !important; }`);
  styleSheet.insertRule(`.js-card-back-labels-container button[data-hidepseudo=true] { padding-left: 12px !important; }`);
  styleSheet.insertRule(`label .js-labels-list-item[data-hidepseudo=true] { padding-left: 12px !important; }`);
  styleSheet.insertRule(`[data-hidepseudo=true] { animation: none !important; }`);

  // Fix the new padding changes:
  styleSheet.insertRule(`div[data-testid=trello-card] > div > div:first-child { padding-top: 3px !important; padding-bottom: 4px !important; }`);
  styleSheet.insertRule(`div[data-testid=trello-card] > div > div:first-child:empty { padding-top: 2px !important; padding-bottom: 0px !important; }`);

}

function handleLabels() {

  // Get all unchecked labels:
  const labels = [
    // Card front labels (i.e., the labels shown on the front of each card):
    ...document.querySelectorAll("div[data-testid=trello-card] > div > div:first-child span[data-testid]:not(.trelloColors_checked)"),
    // Card quick-edit front labels (i.e., the labels shown when you right click a card):
    ...document.querySelectorAll("div[data-testid=quick-card-editor-card-front] > div > div:first-child span[data-testid]:not(.trelloColors_checked)"),
    // Card back labels (i.e., the labels shown on the back of each card when you click to open it, under the "Labels" section):
    ...document.querySelectorAll(".js-card-back-labels-container div > span[data-testid=card-label]:not(.trelloColors_checked):not([type])"),
    // Popover label selector and suggested labels (i.e., the labels shown in the popover menu that appears when you chose to select labels for a card):
    ...document.querySelectorAll("[data-testid=labels-popover-labels-screen] [data-testid=card-label]:not(.trelloColors_checked)")
  ];

  // Loop through the unchecked labels and update them to display their custom color (if any):
  labels.forEach(label => {

    // Get the label title from the aria text:
    const labelTitle = cleanQuotes(label.ariaLabel?.split(": ")[2].slice(1, -1));

    // Mark this label as checked:
    label.classList.add("trelloColors_checked");
    
    // Return if the label is invalid; inform the user that they should open an issue on GitHub:
    if (labelTitle === undefined)
      return console.error("Invalid label. Please open an issue on GitHub (https://github.com/branbarh/Trello-Colors-Extension/issues) and outline the steps to reproduce this error.", label);

    // Return if the label does not have a custom color associated with it:
    if (labelTitle.indexOf("#") !== 0 || labelTitle.indexOf(":") < labelTitle.indexOf("#")) {
      label.style.removeProperty("background-color");
      label.style.removeProperty("color");
      label.dataset.hidepseudo = false;
      return;
    }

    // Get the custom color associated with the label:
    const hex = labelTitle.split(":")[0];

    // Determine if the label has its text showing:
    const isBackLabel = label?.parentNode?.parentNode?.parentNode?.parentNode?.classList?.contains("js-card-back-labels-container");
    const isPopoverLabel = label?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.dataset?.testid === "labels-popover-labels-screen";
    const isSuggestedLabel = label?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.dataset?.testid === "labels-popover-suggested-labels";
    const isFrontLabelTextShowing = document.getElementById("trello-root").classList.contains("body-card-label-text") || document.getElementById("trello-root").classList.contains("body-card-label-text-on");
    
    // Back labels, popover labels, and suggested labels always have their text showing; front labels will only have their text showing when expanded (i.e., when isFrontLabelTextShowing is true):
    const isLabelTextShowing = isBackLabel || isPopoverLabel || isSuggestedLabel || isFrontLabelTextShowing;

    // Update the relevant label styles and data:
    label.style.backgroundColor = hex;
    label.style.color = isLabelTextShowing ? hexToLabelTextColor(hex) : "#00000000";
    label.dataset.hidepseudo = true;
    label.innerText = labelTitle.substring(hex.length + 1);

  });

}

function handleLabelInput() {

  // Get the label input and the save button:
  const input = document.querySelector("section.js-react-root > div > div > input.nch-textfield__input:not(.trelloColors_eventAdded)");
  const saveButton = document.querySelector("section.js-react-root > div > div[class] > button");

  // Return if there is no label input currently being displayed to the user:
  if (!input)
    return;

  // Mark the label input as checked:
  input.classList.add("trelloColors_eventAdded");
  
  // Update the label preview when the input changes:
  input.addEventListener("input", function() {
    updateLabelPreview(this);
  });
  updateLabelPreview(input);

  // Uncheck all labels when the current label is saved, as all instances of this label will need to be updated in accordance with the new changes:
  input.addEventListener("keydown", function(e) {
    if (e.keyCode === 13)
      uncheckAllLabels();
  });
  saveButton.addEventListener("click", uncheckAllLabels);

}

function updateLabelPreview(input) {

  // Get the label preview element:
  const label = document.querySelector("section.js-react-root span[data-testid='card-label']");

  // If there is no custom color, remove any custom, previously set properties:
  if (input.value.indexOf("#") !== 0 || input.value.indexOf(":") < input.value.indexOf("#")) {
    label.style.removeProperty("background-color");
    label.style.removeProperty("color");
    label.dataset.hidepseudo = false;
    label.innerText = input.value;
    return;
  }

  // Otherwise, a custom color has been provided; update the label preview to display the custom color:
  const hex = input.value.split(":")[0];

  // Update the label preview properties:
  label.style.backgroundColor = hex;
  label.style.color = hexToLabelTextColor(hex);
  label.dataset.hidepseudo = true;
  label.innerText = input.value.substring(hex.length + 1);

}

// ======================================= UTILITY FUNCTIONS =======================================

function cleanQuotes(str) {

  // Remove any extraneous quotes:
  let quoteChars = "«»".split("");
  quoteChars.forEach(q => (str = str?.split(q).join("")));

  // Return the cleaned string:
  return str;

}

function hexToLabelTextColor(hex) {

  // Get the number of hex digits per RGB channel (usually either 1 (e.g., #000) or 2 (e.g., #000000)):
  const numColorDigits = Math.floor(hex.length / 3);

  // Get the value for each RGB channel:
  const colors = {
    r: parseInt(hex.substring(1 + 0 * numColorDigits, 1 + 1 * numColorDigits), 16),
    g: parseInt(hex.substring(1 + 1 * numColorDigits, 1 + 2 * numColorDigits), 16),
    b: parseInt(hex.substring(1 + 2 * numColorDigits, 1 + 3 * numColorDigits), 16)
  };

  // Determine if the color is too bright (i.e., exceeds the treshold) and a dark text color should be used, or if it is below the threshold and a light text color should be used:
  const threshold = Math.pow(16, numColorDigits) / 2;
  const labelTextColor = (colors.r + colors.g + colors.b) / 3 > threshold ? "#1d2125" : "#ffffffe0";

  // Return the calculated label text color:
  return labelTextColor;

}

function uncheckAllLabels() {

  // Delay unchecking all labels by a frame to ensure that the card front labels have updated:
  setTimeout(() => {

    // Get all checked labels:
    const checkedLabels = [...document.getElementsByClassName("trelloColors_checked")];

    // Uncheck all checked labels:
    checkedLabels.forEach(label => {
      label.classList.remove("trelloColors_checked");
    });

  }, 0);

}
