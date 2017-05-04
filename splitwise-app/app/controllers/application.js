import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    checkLoginCredentials(promise, userLoginObject) {
      var classThis = this;
      promise.then(function(data) {
        if (data.allUsersEmailArray.includes(userLoginObject.userEmail)) {
          classThis.send('checkForPassword', userLoginObject);
        } else {
          console.log('Wrong User');
        }
      });
    },
    checkForPassword(userLoginObject) {
      var allUsersAuthPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.getJSON('api/usersEmailAuth').then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      this.send('callThisFunctionInAController1', allUsersAuthPromise, userLoginObject);
    },
    callThisFunctionInAController1(promise, userLoginObject) {
      promise.then(function(data) {
        if (data.userPwd[userLoginObject.userEmail] === userLoginObject.userPassword) {
          console.log('authenticated User');
        } else {
          console.log('Wrong User');
        }
      });
    },
    saveUserIntoDB(userSignUpObject) {
      var userObject = this.store.createRecord('userObject', userSignUpObject);
      userObject.save();
    }
  }
});
