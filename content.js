chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'captureScreenshot') {
    window.scrollTo(0, document.body.scrollHeight);

    setTimeout(function() {
      window.scrollTo(0, 0);

      html2canvas(document.body).then(function(canvas) {
        sendResponse({ dataURL: canvas.toDataURL() });
      });
    }, 3000);
  }

  return true;
});
