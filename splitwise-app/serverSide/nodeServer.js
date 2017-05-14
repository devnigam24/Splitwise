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

app.get('/getCategoryJson', function(req, res) {
  client.get('https://secure.splitwise.com/api/v3.0/get_categories', function(catJson) {
    var returnArray = [];
    catJson.categories.forEach((d) => {
      var otherName = d.name;
      d.subcategories.forEach((e) => {
        if (e.name == 'Other') {
          e.name = otherName + '/' + e.name;
        }
        var returnObj = {};
        returnObj['name'] = e.name;
        returnObj['icon'] = e.icon;
        returnArray.push(returnObj);
      });
    });
    res.send(returnArray);
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
    res.send(data.friends);
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
        'balance': '0',
        'id': req.body.email
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
      insertRecordPromise.then((data) => {
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
    'amount': req.body.totalAmount,
    'paidInBetween': req.body.paidInBetween,
    'getBack': req.body.getBack,
    'id': userInSessionObject.firstName + '-' + req.body.description.replace(" ", "-")
  };
  console.log(billObject);
  var args = {
    data: billObject,
    headers: {
      "Content-Type": "application/json"
    }
  };
  client.post(host + "/expenses", args, function(data) {
    updateExpensecForThisFriend(billObject.paidInBetween, billObject.getBack);
    res.send(data);
  });
});

function updateExpensecForThisFriend(friendsToBeUpdatedArray, valueToUpdate) {
  valueToUpdate = valueToUpdate / JSON.parse(friendsToBeUpdatedArray).length;
  console.log(valueToUpdate);
  client.get(host + "/allRegisteredUserObjects/" + userInSessionObject.userEmail, function(data) {
    [].slice.call(friendsToBeUpdatedArray).forEach((oneFriend) => {
      [].slice.call(data.friends).forEach((obj) => {
        if (obj.name == oneFriend) {
          var oldObj = obj;
          obj.balance = (parseInt(obj.balance) - parseInt(valueToUpdate)).toString();
          [].slice.call(data.friends)[[].slice.call(data.friends).indexOf(oldObj)] = obj;
        }
      });
    });
    updateThisUserInDb(data);
  });
}

function updateThisUserInDb(dataToUpdate) {
  var deleteRecordPromise = new Promise(function(resolve, reject) {
    client.delete(host + "/allRegisteredUserObjects/" + dataToUpdate.userEmail, (data) => {
      resolve(data);
      reject(data);
    });
  });
  deleteRecordPromise.then((data) => {
    console.log('old' + JSON.stringify(data));
    console.log('Old object deleted');
    var args = {
      data: dataToUpdate,
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log(args);
    client.post(host + "/allRegisteredUserObjects", args, (data) => {
      console.log('new User Inserted');
      console.log('new' + JSON.stringify(data));
    });
  });
}

http.createServer(app).listen(3000, function() {
  console.log('Server listening on port 3000');
});
