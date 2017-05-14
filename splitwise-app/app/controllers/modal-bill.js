import Ember from 'ember';

export default Ember.Controller.extend({
  billObject: {
    'description': '',
    'totalAmount': '',
    'paidInBetween': [],
    'getBack': ''
  },
  groupBillObject: {
    'description': '',
    'totalAmount': '',
    'groupName': '',
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
          friendsArray = this.value.split(', ');
        }
      });
      this.billObject.paidInBetween = JSON.stringify(friendsArray);
    },
    save() {
      this.billObject.getBack =
        ((parseInt(this.billObject.totalAmount) /
        (JSON.parse(this.billObject.paidInBetween).length + 1)) *
        JSON.parse(this.billObject.paidInBetween).length).toString();
        console.log('this'+this.billObject);
        this.send('saveBill', this.billObject);
    },
    fetchGroupName(){

    },
    fetchGroupDescription(){

    },
    fetchGroupAmont(){

    }
  }
});
