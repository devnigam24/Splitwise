import Ember from 'ember';

export default Ember.Route.extend({
  init() {
    this._super(...arguments);
  },
  didRender() {
    this._super(...arguments);
    console.log('Modal aa gaya');
  }
});
