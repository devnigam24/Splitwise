import Ember from 'ember';

export default Ember.Controller.extend({
  userLoginObject: {
    'userEmail': '',
    'userPassword': ''
  },
  userSignUpObject: {
    'firstName': '',
    'lastName': '',
    'userEmail': '',
    'userPassword': ''
  },
  actions: {
    checkLogin() {
      var allUsersEmailPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.getJSON('api/allUsersEmail').then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      this.sendAction('checkLoginCredentials', allUsersEmailPromise, this.userLoginObject);
    },
    signUpUser() {
      this.sendAction('saveUserIntoDB', this.userSignUpObject);
    },
    checkForLoginEmail() {
      this.userLoginObject.userEmail = this.get('userEmail');
    },
    fetchLoginPassword() {
      this.userLoginObject.userPassword = this.get('userPassword');
    },
    fetchSignUpPassword() {
      this.userSignUpObject.userPassword = this.get('userPassword');
    },
    checkForFirstName() {
      this.userSignUpObject.firstName = this.get('firstName');
    },
    checkForLastName() {
      this.userSignUpObject.lastName = this.get('lastName');
    },
    checkForSignUpEmail() {
      this.userSignUpObject.userEmail = this.get('userEmail');
    }
  }
});
