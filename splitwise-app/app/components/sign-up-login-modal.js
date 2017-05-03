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
      var allUsersEmailPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.getJSON('api/allUsersEmail').then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      this.send('callThisFunctionInAController',allUsersEmailPromise);
    },
    signUpUser() {
      //console.log(this.userSignUpObject);
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
    },




    callThisFunctionInAController(promise) {
      var classThis = this;
      promise.then(function(data){
        if(data.allUsersEmailArray.includes(classThis.userLoginObject.userEmail)){
          classThis.send('checkForPassword',classThis.userLoginObject.userEmail);
        }else{
          console.log('Wrong User');
        }
      });
    },



    checkForPassword(){
      var allUsersAuthPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.getJSON('api/usersEmailAuth').then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      this.send('callThisFunctionInAController1',allUsersAuthPromise);
    },
    callThisFunctionInAController1(promise){
      var classThis = this;
      promise.then(function(data){
        if(data.userPwd[classThis.userLoginObject.userEmail] === classThis.userLoginObject.userPassword){
          console.log('authenticated User');
        }else{
          console.log('Wrong User');
        }
      });
    }
  }
});
