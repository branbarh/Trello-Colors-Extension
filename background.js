
chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
      if (tabs[0].title.indexOf("Trello") !== -1) {
	      chrome.tabs.executeScript(tabs[0].id, {
            "code": `

              setInterval(function() {
                var labels = document.querySelectorAll(".card-label[title*='#']");

                for (var i = 0, len = labels.length, color; i < len; i++) {
                  if (labels[i].title.indexOf(":") > 0) {
                    color = labels[i].title.split(":")[0];
                    labels[i].style.backgroundColor = color;

                    labels[i].title = labels[i].title.substring(color.length + 1);
                    if (labels[i].innerText != "") {
                        labels[i].innerText = labels[i].innerText.substring(color.length + 1);                
                    }
                  }        
                }
              }, 0);

		`
	      });
      }
    });
});
