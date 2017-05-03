import Ember from 'ember';

export default Ember.Component.extend({
  model(){
    var user = {};
  },
  actions: {
    checkLogin() {
      console.log('Modal controllers');
      console.log(this.get(user));
    }
  }
});
