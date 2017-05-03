import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    checkLogin() {
      console.log(this.userLoginObject);
      this.sendAction('actionName', params);
      Ember.$.getJSON('api/allUsers').then(data => {
        return data;
      });
    },
    lelo(){
      console.log('hello');
      return 'hello';
    }
  }
});
