import Ember from 'ember';
import Router from '../router';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    console.log('Header aa gaya');
  },
  didRender() {
    this._super(...arguments);
  }
});
