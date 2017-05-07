import Ember from 'ember';

export default Ember.Route.extend({
  init() {
    this._super(...arguments);
    console.log('Modal aa gaya');
  },
  didRender() {
    this._super(...arguments);
  },
  model() {
    return Ember.$.getJSON('api/getAllUsersFromJSONServer').then(data => {
      console.log(data);
    });
  },
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
      var _this = this;
      promise.then(function(data) {
        if (data.userPwd[userLoginObject.userEmail] === userLoginObject.userPassword) {
          console.log('authenticated User');
          _this.transitionTo('user-dashboard');
        } else {
          console.log('Wrong User');
        }
      });
    },
    saveUserIntoDB(userSignUpObject) {
      var saveUserIntoDBPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.post('api/saveUserIntoDB', userSignUpObject).then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      saveUserIntoDBPromise.then(function(data) {
        console.log('saveUserIntoDBPromise' + data);
      });
    }
  }
});
