chrome.tabs.onUpdated.addListener(function() {
  chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
    if (tabs[0].title.indexOf("Trello") !== -1) {
      chrome.tabs.executeScript(tabs[0].id, {
          "code": `

            setInterval(function() {
              let labels = document.querySelectorAll(".card-label, .label-text");
              let color;

              labels.forEach(label => {
                if (label.title.indexOf(":") > 0)
                  color = label.title.split(":")[0];
                else if (label.innerText.indexOf(":") > 0)
                  color = label.innerText.split(":")[0];
                else
                  return;

                label.style.backgroundColor = color;
                label.title = label.title.substring(color.length + 1);
                label.childNodes[0].nodeValue = label.innerText.substring(color.length + 1);
              });
            }, 50);
  `
      });
    }
  });
});
