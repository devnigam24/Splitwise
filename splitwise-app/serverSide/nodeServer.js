"use strict";

var http = require('http');

var options = {
  host: 'localhost',
  path: '/allUser',
  port: '3009',
  headers: {
    'Content-Type': 'application/json'
  }
};

http.createServer(function(req, res) {
  console.log('Responding to a request.');
  console.log("urlValue->>>>>>" + req.url);
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/api/getAllUsersFromJSONServer') {
    http.request(options, function(response) {
      var str = ''
      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function() {
        res.end(str);
      });
    }).end();
  } else {
    res.end(JSON.stringify({
      'default': 'defaultValue'
    }));
  }
}).listen(3000, function() {
  console.log('Server listening on port 3000');
});
