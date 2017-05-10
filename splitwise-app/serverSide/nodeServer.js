'use strict'
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var http = require('http');
var Client = require('node-rest-client').Client;
app.use(express.static("."));
app.use(bodyparser.json({
  type: 'application/*+json'
}));
app.use(bodyparser.urlencoded({
  extended: false
}));

var userInSessionObject = {};
var client = new Client();
var host = 'http://localhost:3009';

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/serverSideFile.html");
});

app.get('/allUsersEmailArray', function(req, res) {
  client.get(host + req.url, function(data) {
    res.send(data);
  });
});

app.get('/allRegisteredUserObjects', function(req, res) {
  client.get(host + req.url, function(data) {
    res.send(data);
  });
});

app.get('/allUsersEmailAndPwd', function(req, res) {
  client.get(host + req.url.substring(0, req.url.indexOf('?')) + '/' + req.query.emailAsId, function(data) {
    res.send(data);
  });
});

app.get('/getFriends', function(req, res) {
  client.get(host + '/allRegisteredUserObjects' + '/' + userInSessionObject.userEmail, function(data) {
    res.send(data);
  });
});

app.get('/getAllExpenses', function(req, res) {
  client.get(host + '/expenses', function(data) {
    res.send(data);
  });
});

app.get('/logout', function(req, res) {
  userInSessionObject = {};
  res.send({
    'logout': 'done'
  });
});

app.get('/getUserInSession', function(req, res) {
  res.send(userInSessionObject);
});

app.post('/setUserInSession', function(req, res) {
  console.log('setUserInSession');
  client.get(host + "/allRegisteredUserObjects/" + req.body.userEmail, function(data) {
    userInSessionObject = data;
    res.send(data);
  });
});

app.post('/postOneRegisteredUserObjects', function(req, res) {
  userInSessionObject = {
    'id': req.body.userEmail,
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'userEmail': req.body.userEmail,
    'friends': [],
    'groups': []
  }

  var args = {
    data: userInSessionObject,
    headers: {
      "Content-Type": "application/json"
    }
  };

  client.post(host + "/allRegisteredUserObjects", args, () => {
    var args1 = {
      data: {
        'id': userInSessionObject.userEmail,
        [userInSessionObject.userEmail]: req.body.userPassword
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    client.post(host + "/allUsersEmailAndPwd", args1, (data) => {
      res.send(data);
    });
  });
});

app.post('/addFriendIntoList', function(req, res) {
  var objToInsertInDb = {};
  var addFriendPromise = new Promise(function(resolve, reject) {
    client.get(host + "/allRegisteredUserObjects/" + userInSessionObject.userEmail, function(dataObj) {
      var friendObject = {
        'name': req.body.name,
        'emailId': req.body.email,
        'balance': '0'
      }
      dataObj.friends.push(friendObject);

      resolve(dataObj);
      reject(dataObj);
    });
  });

  addFriendPromise.then(function(data) {
    objToInsertInDb = data;
    var deleteRecordPromise = new Promise(function(resolve, reject) {
      client.delete(host + "/allRegisteredUserObjects/" + userInSessionObject.userEmail, (data) => {
        resolve(data);
        reject(data);
      });
    });
    deleteRecordPromise.then(() => {
      var args = {
        data: objToInsertInDb,
        headers: {
          "Content-Type": "application/json"
        }
      };
      var insertRecordPromise = new Promise(function(resolve, reject) {
        client.post(host + "/allRegisteredUserObjects", args, function(data) {
          resolve(data);
          reject(data)
        });
      });
      insertRecordPromise.then((data) =>{
        userInSessionObject = data;
        res.send(data);
      });
    });
  });
});

app.post('/addBillIntoList', function(req, res) {
  var billObject = {
    'paidBy': userInSessionObject.firstName,
    'description': req.body.description,
    'amount': req.body.amount,
    'friends': req.body.friends,
    'getBack': req.body.getBack,
    'id': userInSessionObject.firstName + req.body.description
  };

  var args = {
    data: billObject,
    headers: {
      "Content-Type": "application/json"
    }
  };
  client.post(host + "/expenses", args, function(data) {
    res.send(data);
  });
});

http.createServer(app).listen(3000, function() {
  console.log('Server listening on port 3000');
});
