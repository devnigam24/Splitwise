import DS from 'ember-data';

export default DS.Model.extend({
  userName: DS.attr('string'),
  activityAddedBy: DS.attr('string'),
  description: DS.attr('string')
});
