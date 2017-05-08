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
      this.send('checkLoginCredentials', this.userLoginObject);
    },
    signUpUser() {
      this.send('saveUserIntoDB', this.userSignUpObject);
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
