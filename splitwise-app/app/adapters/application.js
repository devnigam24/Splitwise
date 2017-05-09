import DS from 'ember-data';
import App from '../app';

App.DefaultAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});
