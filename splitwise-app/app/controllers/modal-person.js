import Ember from 'ember';

export default Ember.Controller.extend({
    friendObject: {
    'name': '',
    'email': ''
  },
  actions: {
    checkForFriendName() {
      this.friendObject.name = this.get('appFriend');
    },
    checkForFriendEmail() {
      this.friendObject.email = this.get('friendEmail');
    },
    addFriendInDb(){
      this.send('saveFriend', this.friendObject);
    }
  }
});
