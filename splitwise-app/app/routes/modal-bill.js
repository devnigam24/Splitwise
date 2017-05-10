import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.$.getJSON('/getFriends');
  },
  actions: {
    saveBill(billObj) {

      var addbillObj = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.post('/addBillIntoList', billObj).then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      var _this = this;
      addbillObj.then(function(data) {
        
        _this.transitionTo('user-dashboard');
      });
    }
  }
});
