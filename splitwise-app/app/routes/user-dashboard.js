import Ember from 'ember';

export default Ember.Route.extend({
  model() {      
      return Ember.RSVP.hash({
          expenses: Ember.$.getJSON('/getAllExpenses'),
          userInsession: Ember.$.getJSON('/getUserInSession')          
        });
  }
});
