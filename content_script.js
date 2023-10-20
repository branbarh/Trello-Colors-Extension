
window.addEventListener("load", function() {

  handleCSSRules();

  setInterval(function() {

    handleLabelInput();
    handleLabels();

  }, 0);

});

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

function handleLabelInput() {

  // Get the label input:
  let input, saveButton;
  if (document.querySelector("section.js-react-root > div > div > input.nch-textfield__input:not(.trelloColors_eventAdded)"))
    input = document.querySelector("section.js-react-root > div > div > input.nch-textfield__input:not(.trelloColors_eventAdded)");

  if (input) {

    // Handle the label input:
    input.classList.add("trelloColors_eventAdded");
    input.addEventListener("keydown", function(e) {
      if (e.keyCode !== 13)
        return;

      [...document.getElementsByClassName("trelloColors_checked")].forEach(label => {
        label.classList.remove("trelloColors_checked");
      });
    });
    input.addEventListener("input", function() {
      updateLabelPreview(this);
    });
    updateLabelPreview(input);

    // Handle the "Save" button:
    saveButton = document.querySelector("section.js-react-root > div > div[class] > button");
    saveButton.addEventListener("click", function() {
      [...document.getElementsByClassName("trelloColors_checked")].forEach(label => {
        label.classList.remove("trelloColors_checked");
      });
    });

  }

}

function cleanQuotes(str) {

  let quoteChars = "«»".split("");
  quoteChars.forEach(q => (str = str.split(q).join("")));

  return str;
}

function handleLabels() {

  // Get all of the labels:
  let labels = [...document.querySelectorAll("div[data-testid=trello-card] > div > div:first-child button[data-testid]:not(.trelloColors_checked)")];

  // Get the labels on the back of the card, if any exist:
  if (document.querySelectorAll(".js-card-back-labels-container button:not(.trelloColors_checked):not([type])").length > 0)
    labels.push(...document.querySelectorAll(".js-card-back-labels-container button:not(.trelloColors_checked):not([type])"));

  if (document.querySelectorAll("label .js-labels-list-item:not(.trelloColors_checked)").length > 0)
    labels.push(...document.querySelectorAll("label .js-labels-list-item:not(.trelloColors_checked)"));

  // Loop through the labels and update them according to their color:
  let color, labelTitle;
  labels.forEach(label => {

    // Pull the label title from the aria text:
    labelTitle = cleanQuotes(label.ariaLabel.split(": ")[2].slice(1, -1));

    // Add this label to the "checked" list of labels:
    label.classList.add("trelloColors_checked");

    // Return if the label does not have a color associated with it:
    if (labelTitle.indexOf("#") !== 0 || labelTitle.indexOf(":") < labelTitle.indexOf("#")) {
      label.style.removeProperty("background-color");
      label.style.removeProperty("color");
      label.dataset.hidepseudo = false;
      return;
    }

    // Get the color associated with the label:
    color = labelTitle.split(":")[0];

    // Determine if the label is on the back of a card:
    let isCardBackLabel = label.parentNode.parentNode.parentNode.parentNode.classList.contains("js-card-back-labels-container") || label.classList.contains("js-labels-list-item");

    // Update the relevant data:
    label.style.backgroundColor = color;
    label.style.color = (isCardBackLabel || document.getElementById("trello-root").classList.contains("body-card-label-text") || document.getElementById("trello-root").classList.contains("body-card-label-text-on")) ? ((parseInt(color.substring(1, 1 + Math.floor(color.length / 3)), 16) + parseInt(color.substring(1 + Math.floor(color.length / 3), 1 + 2 * Math.floor(color.length / 3)), 16) + parseInt(color.substring(1 + 2 * Math.floor(color.length / 3), 1 + 3 * Math.floor(color.length / 3)), 16)) / 3 > (Math.pow(16, Math.floor(color.length / 3)) / 2) ? "#172b4d" : "#ffffff") : "rgba(0, 0, 0, 0)";
    label.dataset.hidepseudo = true;
    label.innerText = labelTitle.substring(color.length + 1);

  });

}

function updateLabelPreview(input) {

  let label = document.querySelector("section.js-react-root div[data-testid='card-label']");

  // Get the color and update the label preview:
  if (input.value.indexOf("#") !== 0 || input.value.indexOf(":") < input.value.indexOf("#")) {
    label.style.removeProperty("background-color");
    label.style.removeProperty("color");
    label.dataset.hidepseudo = false;
    label.innerText = input.value;
    return;
  }

  let color = input.value.split(":")[0];

  label.style.backgroundColor = color;
  label.style.color = (parseInt(color.substring(1, 1 + Math.floor(color.length / 3)), 16) + parseInt(color.substring(1 + Math.floor(color.length / 3), 1 + 2 * Math.floor(color.length / 3)), 16) + parseInt(color.substring(1 + 2 * Math.floor(color.length / 3), 1 + 3 * Math.floor(color.length / 3)), 16)) / 3 > (Math.pow(16, Math.floor(color.length / 3)) / 2) ? "#172b4d" : "#ffffff";
  label.dataset.hidepseudo = true;
  label.innerText = input.value.substring(color.length + 1);

}
