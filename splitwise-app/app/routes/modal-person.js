import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveFriend(friendObject) {
      var addFriendIntoList = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.post('/addFriendIntoList', friendObject).then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      var _this = this;
      addFriendIntoList.then(function(data) {
        
        _this.transitionTo('user-dashboard');
      });
    }
  }
});
