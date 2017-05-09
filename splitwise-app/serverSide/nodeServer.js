"use strict";
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var http = require('http');
var Client = require('node-rest-client').Client;
app.use(express.static("."));
app.use(bodyparser.json({ type: 'application/*+json' }));
app.use(bodyparser.urlencoded({ extended: false }));

//var userInSessionObject =   {"userEmail": "maruti@gmail.com"};
var userInSessionObject =   {};
var client = new Client();
var host = 'http://localhost:3009';

app.get('/', function(req,res){
   res.sendFile(__dirname+"/serverSideFile.html");
});

app.get('/allUsersEmailArray', function(req,res) {    
    client.get(host+req.url, function (data, response) {
        
        res.send(data);
    });
});

app.get('/allRegisteredUserObjects', function(req,res) {
    client.get(host+req.url, function (data, response) {
        
        res.send(data);
    });
});

app.get('/allUsersEmailAndPwd', function(req,res) {
    client.get(host+req.url, function (data, response) {
        
        res.send(data);
    });
});

app.get('/getFriends', function(req,res) {
    client.get(host+'/allRegisteredUserObjects'+'/'+userInSessionObject.userEmail, function (data, response) {
        
        res.send(data);
    });
});

app.get('/getAllExpenses', function(req,res) {
    console.log(host+'/expenses');
    client.get(host+'/expenses', function (data, response) {
        
        res.send(data);
    });
});

app.get('/logout', function(req,res) {
    userInSessionObject =   {};
    res.send({'logout':'done'});
});

app.get('/getUserInSession', function(req,res) {
    res.send(userInSessionObject);
});

app.post('/setUserInSession', function(req,res) {
    console.log("req.body"+host+"/allRegisteredUserObjects/"+req.body.userEmail);
    client.get(host+"/allRegisteredUserObjects/"+req.body.userEmail, function (data, response) {
        
        userInSessionObject = data;
        res.send(data);
    });
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
        res.send(data);
    });
});

app.post('/addFriendIntoList', function(req,res) {
    console.log('aaya');
    var friendObject = {
      'name': req.body.name,
      'emailId': req.body.email,
      'balance': '0'
    }    
    
    client.get(host+"/allRegisteredUserObjects/"+userInSessionObject.userEmail, function (dataObj, response) {
        console.log(dataObj);
        dataObj.friends.push(friendObject);
        console.log(dataObj);        
        client.delete(host+"/allRegisteredUserObjects/"+userInSessionObject.userEmail,function(data){
            
        });
        var args = {
            data: dataObj,
            headers: { "Content-Type": "application/json" }
        };
        client.post(host+"/allRegisteredUserObjects", args, function (data, response) {
            
            userInSessionObject = data;
            res.send(dataObj);
        });         
    });
});

app.post('/addBillIntoList', function(req,res) {
    var billObject = {'paidBy': userInSessionObject.firstName,'description': req.body.description,'amount': req.body.amount,'friends':req.body.friends,'getBack':req.body.getBack,'id':userInSessionObject.firstName+req.body.description};
    
    var args = {
        data: billObject,
        headers: { "Content-Type": "application/json" }
    };
    console.log(billObject);
    client.post(host+"/expenses", args, function (data, response) {        
        res.send(data);
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