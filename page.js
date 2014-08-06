function renderPage(url) {
  var page = require('webpage').create();
  page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36';
  var redirectURL = null;

  page.onResourceReceived = function(resource) {
  	// console.log(resource);
    if (url == resource.url && resource.redirectURL) {
      redirectURL = resource.redirectURL;
    }
  };

  page.open(url, function(status) {
    if (redirectURL) {
      renderPage(redirectURL);
    } else if (status == 'success') {
      console.log(page.content);
      phantom.exit();
    } else {
    	renderPage(url);
    	// console.log(status);
      // ...
    }
  });
}

renderPage(require('system').args[1])