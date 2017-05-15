import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addMessage: function() {
      var newMessage1 = this.store.createRecord('message', {
        userName: 'q',
        activityAddedBy: 'anjali@gmail.com',
        description: 'food bill',
        notifictionSeen: 'false'
      });
      newMessage1.save();
    }
  }
});
