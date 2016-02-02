import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(value) {
    if (Ember.isArray(value)) {
      return Em.A(value);
    } else {
      return Em.A();
    }
  },

  serialize(value) {
    if (Ember.isArray(value)) {
      return Em.A(value);
    } else {
      return Em.A();
    }
  }
});
