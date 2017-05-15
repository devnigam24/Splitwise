import Ember from 'ember';

export default Ember.Route.extend({
  model() {

    var sessionData = Ember.$.getJSON('/getUserInSession');
    //var jsonResponse = JSON.parse(sessionData);
    console.log(sessionData);
    //console.log(userData);
    return Ember.RSVP.hash({
      expenses: Ember.$.getJSON('/getAllExpenses'),
      userInsession: Ember.$.getJSON('/getUserInSession'),
      message:this.store.findAll('message'),
      userInSessionEmail:'akshay@gmail.com'
    });
  }
});
