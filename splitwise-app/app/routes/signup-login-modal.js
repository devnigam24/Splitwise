import Ember from 'ember';

export default Ember.Route.extend({
  init() {
    this._super(...arguments);
    console.log('Modal aa gaya');
  },
  didRender() {
    this._super(...arguments);
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
      var record = this.store.createRecord('person', {
        firstName: 'Rails is Omakase',
        lastName: 'Lorem ipsum'
      });
      record.save();
      // var userObject = this.store.createRecord('person', userSignUpObject);
      // userObject.save();
      // this.store.push({
      //   data: {
      //     id: userSignUpObject.userEmail,
      //     type: 'person',
      //     attributes: {
      //       userSignUpObject
      //     }
      //   }
      // });
    }
  }
});
