import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    console.log('Footer aa gaya');
  },
  didRender() {
    this._super(...arguments);
  }
});
