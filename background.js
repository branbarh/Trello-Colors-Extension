
chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        "code": `

          setInterval(function() {
            var labels = document.getElementsByClassName("card-label");

            for (var i = 0, len = labels.length, color; i < len; i++) {
              if (labels[i].innerText.indexOf("#") === 0 && labels[i].innerText.indexOf(":") > 0) {
                color = labels[i].innerText.split(":")[0];
                labels[i].style.backgroundColor = color;

                labels[i].innerText = labels[i].innerText.substring(color.length + 1);
              }
            }
          }, 0);

        `
      });
    });
});
