import Ember from 'ember';

export default Ember.Controller.extend({
  billObject: {
    'description': '',
    'totalAmount': '',
    'paidInBetween': [],
    'getBack': ''
  },
  actions: {
    fetchDescription() {
      this.billObject.description = this.get('description');
    },
    fetchAmount() {
      this.billObject.totalAmount = this.get('amount');
    },
    fetchFriends() {
      var friendsArray = [];
      Ember.$('input[type="text"]').each(function() {
        if (Ember.$(this).attr('class') === 'select-dropdown active') {
          friendsArray = this.value.split(' ');
        }
      });
      this.billObject.paidInBetween = friendsArray;
    },
    save() {
      this.billObject.getBack =
        ((parseInt(this.billObject.totalAmount) /
        (this.billObject.paidInBetween.length + 1)) *
        this.billObject.paidInBetween.length).toString();
        console.log('this'+this.billObject);
        this.send('saveBill', this.billObject);
    }
  }
});
