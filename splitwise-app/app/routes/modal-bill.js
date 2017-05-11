import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({

      firendsArray: Ember.$.getJSON('/getFriends'),
      iconNameUrlObject: Ember.$.getJSON('https://secure.splitwise.com/api/v3.0/get_categories').success((objectObj) => {
        objectObj.categories.forEach(function(oneObject) {
          if (oneObject.subcategories !== undefined) {
            oneObject.subcategories.forEach((oneSubCategory) => {
              iconNameUrlObject[oneSubCategory.name] = oneSubCategory.icon;
            });
          }
        });
      })
    });



  },
  actions: {
    saveBill(billObj) {
      var addbillObj = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.post('/addBillIntoList', billObj).then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      var _this = this;
      addbillObj.then(function() {
        _this.transitionTo('user-dashboard');
      });
    }
  }
});
