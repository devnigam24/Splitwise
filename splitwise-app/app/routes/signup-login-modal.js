import Ember from 'ember';

export default Ember.Route.extend({
  init() {
    this._super(...arguments);
    console.log('Modal aa gaya');
  },
  actions: {
    checkLoginCredentials(userLoginObject) {
      var classThis = this;
      var allUsersEmailPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.getJSON('/allUsersEmailArray').then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });

      allUsersEmailPromise.then(function(data) {
        if (data.includes(userLoginObject.userEmail)) {
          classThis.send('checkForPassword', userLoginObject);
        } else {
          console.log('Wrong User');
        }
      });
    },
    checkForPassword(userLoginObject) {
      var allUsersAuthPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.getJSON('/allUsersEmailAndPwd').then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      this.send('authenticateUser', allUsersAuthPromise, userLoginObject);
    },
    authenticateUser(promise, userLoginObject) {
      var _this = this;
      promise.then(function(data) {
        if (data[userLoginObject.userEmail] === userLoginObject.userPassword) {
          console.log('authenticated User');               
          var setUserInSessionPromise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.post('/setUserInSession',userLoginObject).then(data => {
              if (data) {
                resolve(data);
              } else {
                reject(data);
              }
            });
          });
          setUserInSessionPromise.then(function(data) {
            console.log('saveUserIntoDBPromise' + data);
            _this.transitionTo('user-dashboard');
          });
        } else {
          console.log('Wrong User');
        }
      });
    },
    saveUserIntoDB(userSignUpObject) {
      var _this = this;
      var saveUserIntoDBPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.post('/postOneRegisteredUserObjects', userSignUpObject).then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      saveUserIntoDBPromise.then(function(data) {
        console.log('saveUserIntoDBPromise' + data);
        _this.transitionTo('user-dashboard');
      });
    }
  }
});
