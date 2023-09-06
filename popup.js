


//adding timeout

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var tabId = tab.id;

    document.getElementById('pngDownload').addEventListener('click', function() {
      captureScreenshot(tabId, 'png');
    });

    document.getElementById('pdfDownload').addEventListener('click', function() {
      captureScreenshot(tabId, 'pdf');
    });

    setTimeout(function() {
      chrome.tabs.sendMessage(tabId, { action: 'captureScreenshot' });
    }, 3000);
  });
});

function captureScreenshot(tabId, format) {
  chrome.tabs.sendMessage(tabId, { action: 'getScreenshot', format: format }, function(response) {
    if (response && response.dataURL) {
      var downloadLink = document.createElement('a');
      downloadLink.href = response.dataURL;
      downloadLink.download = 'screenshot.' + format;
      downloadLink.click();
    }
  });
}
