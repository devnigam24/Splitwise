import Ember from 'ember';

export default Ember.Controller.extend({
  billObject: {
    'description': '',
    'amount': '',
    'friends': [],
    'getBack': ''
  },
  actions: {
    fetchDescription() {
      this.billObject.description = this.get('description');
    },
    fetchAmount() {
      this.billObject.amount = this.get('amount');
    },
    fetchFriends() {
      var friendsArray = [];
      $('input[type="text"]').each(function() {
        if ($(this).attr('class') === 'select-dropdown active') {
          friendsArray = this.value.split(' ');
        }
      });
      this.billObject.friends = friendsArray;
    },
    save() {
      this.billObject.getBack = ((parseInt(this.billObject.amount) / (this.billObject.friends.length + 1)) * this.billObject.friends.push.length).toString();
      this.send('saveBill', this.billObject);
    }
  }
});
