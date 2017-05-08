"use strict";
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var http = require('http');
var Client = require('node-rest-client').Client;
app.use(express.static("."));
app.use(bodyparser.json({ type: 'application/*+json' }));
app.use(bodyparser.urlencoded({ extended: false }));

var userInSessionObject =   {
                              "firstName": "sanika",
                              "lastName": "sanika",
                              "userEmail": "sanika@sanika.com",
                              "userPassword": "sanika",
                              "id": "sanika@sanika.com",
                              "friends": [{"name": "dev","emailId": "devnigam24@test.com",'balance': '0'}]
                            };
var client = new Client();
var host = 'http://localhost:3009';

app.get('/', function(req,res){
   res.sendFile(__dirname+"/serverSideFile.html");
});

app.get('/allUsersEmailArray', function(req,res) {    
    client.get(host+req.url, function (data, response) {
        console.log(data);
        res.send(data);
    });
});

app.get('/allRegisteredUserObjects', function(req,res) {
    client.get(host+req.url, function (data, response) {
        console.log(data);
        res.send(data);
    });
});

app.get('/allUsersEmailAndPwd', function(req,res) {
    client.get(host+req.url, function (data, response) {
        console.log(data);
        res.send(data);
    });
});

app.get('/getUserInSession', function(req,res) {
    res.send(userInSessionObject);
});

app.post('/postOneRegisteredUserObjects', function(req,res) {
    userInSessionObject = {
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'userEmail': req.body.userEmail,
      'userPassword': req.body.userPassword,
      'friends': [],
      'id': req.body.userEmail,
      'balance' : '0'
    }
    
    var args = {
        data: userInSessionObject,
        headers: { "Content-Type": "application/json" }
    };
    
    client.post(host+"/allRegisteredUserObjects", args, function (data, response) {
        console.log(data);
        res.send(data);
    });
});

app.post('/addFriendIntoList', function(req,res) {
    console.log('aaya');
    var friendObject = {
      'name': req.body.name,
      'emailId': req.body.email,
      'youOwe': '0',
      'heOws': '0'
    }    
    
    client.get(host+"/allRegisteredUserObjects/"+userInSessionObject.userEmail, function (dataObj, response) {
        console.log(dataObj);
        dataObj.friends.push(friendObject);
        console.log(dataObj);        
        client.delete(host+"/allRegisteredUserObjects/"+userInSessionObject.userEmail,function(data){
            console.log(data);
        });
        var args = {
            data: dataObj,
            headers: { "Content-Type": "application/json" }
        };
        client.post(host+"/allRegisteredUserObjects", args, function (data, response) {
            console.log(data);
            userInSessionObject = data;
            res.send(dataObj);
        });         
    });
});

function getResponseToWrite(response, res) {
  var str = ''
  response.on('data', function(chunk) {
    str += chunk;
  });
  response.on('send', function() {
    res.setHeader('Content-Type', 'application/json');
    console.log(str);
    res.send(str);
  });
}

function postResponseToWrite(response) {
  var str = ''
  response.on('data', function(chunk) {
    str += chunk;
  });
  response.on('end', function() {
    response.setEncoding('utf8');
    console.log(str);
  });
}

function getOptions(urlToHit, method) {
  return {
    host: 'localhost',
    path: urlToHit,
    port: '3009',
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
}

http.createServer(app).listen(3000, function(){
    console.log('Server listening on port 3000');
});