import Ember from 'ember';

export default Ember.ArrayController.extend({
  session: Ember.inject.service('session'),

  queryParams: {
    query: 'q',
    order: {
      refreshModel: true
    },
  },

  order: 'desc',
  query: '',
  sortProperties: ['rating'],
  sortAscending: false,

  orderDidChange: Ember.observer('order', function() { this.set('sortAscending', this.get('order') === 'desc' ? false : true); }),

  actions: {
    setQuery() {
      if (this.get('queryString')) {
        this.set('query', this.get('queryString'));
      } else {
        this.set('query', '');
      }
    }
  }
});
