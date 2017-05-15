import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      firendsArray: Ember.$.getJSON('/getFriends'),
      iconNameUrlObject: Ember.$.getJSON('/getCategoryJson')
    });
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
      addbillObj.then(function(d) {
        JSON.parse(d.paidInBetween).forEach((obj) => {
          var newMessage = _this.store.createRecord('message', {
            userName: obj,
            activityAddedBy: d.paidBy,
            description: d.description
          });
          newMessage.save();
        });
        _this.transitionTo('user-dashboard');
      });
    }
  }
});
