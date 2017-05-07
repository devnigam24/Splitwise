import DS from 'ember-data';
import App from '../app';

App.DefaultAdapter =  DS.RESTAdapter.extend({
  namespace: 'api'
});

App.PostAdapter = DS.RESTAdapter.extend({
  namespace: 'http://',
  host: 'localhost',
  port: '3000'
});
