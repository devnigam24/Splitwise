import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      firstName: 'dev',
      lastName: 'Nigam',
      userEmail: 'devNigam',
      userPassword: 'password'
    }
  }
});
