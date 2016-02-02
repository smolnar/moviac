import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    order: {
      refreshModel: true
    }
  },

  order: 'desc'
});
