import Ember from 'ember';

export default Ember.Component.extend({
  userInSession: {},
  init() {
    this._super(...arguments);

  },
  didInsertElement() {
    this._super(...arguments);
    var userInsessionPromise = new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON('/getUserInSession').then(data => {
        if (data) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
    var _this = this;
    userInsessionPromise.then(function(data) {
      _this.set('userInSession', data);
    });
  },
  actions: {
    logOut() {
      var logoutPromise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.getJSON('/logout').then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      logoutPromise.then(() => {
        window.location.href = "http://localhost:4200";
      });
    }
  }
});
