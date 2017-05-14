import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    checkLoginCredentials(userLoginObject) {
      var _this = this;
      var allUsersEmailPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.getJSON('/allUsersEmailAndPwd?emailAsId=' + userLoginObject.userEmail).then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });

      allUsersEmailPromise.then(function(data) {
        if (data[userLoginObject.userEmail] === userLoginObject.userPassword) {
          Ember.$.post('/setUserInSession', userLoginObject).then((data) => {
            console.log('Authorized'+data);
            _this.transitionTo('user-dashboard');
          });
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
        console.log('User created'+data);
        _this.transitionTo('user-dashboard');
      });
    }
  }
});
