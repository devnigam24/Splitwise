import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('signup-login-modal');
  this.route('user-dashboard');
  this.route('modal-bill');
  this.route('modal-person-and-group');
  this.route('log-out');
});

export default Router;
