import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: {
    order: {
      refreshModel: true
    }
  },

  order: 'desc',
  sortProperties: ['rating'],
  sortAscending: false,

  orderDidChange: Ember.observer('order', function() { this.set('sortAscending', this.get('order') === 'desc' ? false : true); })
});
