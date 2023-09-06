

//with timeout
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'injectContentScript') {
    setTimeout(function() {
      chrome.tabs.executeScript(sender.tab.id, { file: 'content.js' }, function() {
        // Content script injected successfully
        sendResponse();
      });
    }, 1000); // Delay of 1 second (adjust as needed)
    return true; // Return true to indicate that the response will be sent asynchronously
  }
});

chrome.runtime.onConnectExternal.addListener(function(port) {
  port.onDisconnect.addListener(function() {
    chrome.tabs.remove(port.sender.tab.id);
  });
});
