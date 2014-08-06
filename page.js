
var fs = require('fs')
var agents = fs.read('./useragents');
var lines = agents.split('\n');
var agent = lines[Math.floor(Math.random()*lines.length)];
function renderPage(url) {
  var page = require('webpage').create();
  page.settings.userAgent = agent;
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