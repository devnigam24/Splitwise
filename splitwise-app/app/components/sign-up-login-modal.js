import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },
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
      console.log(this.userLoginObject);
      Ember.$.getJSON('splitwiseRestCall/allUsers').then(data => {
        console.log(data);
      });
    },
    signUpUser() {
      console.log(this.userSignUpObject);
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
