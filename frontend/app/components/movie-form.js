import Ember from 'ember';

function splitToArray(e) {
  if (e) {
    return e.split(',').map(function(value) { return value.trim(); });
  } else {
    return [];
  }
}

export default Ember.Component.extend({
  actors: null,
  directors: null,

  directorsArray: Ember.computed('directors', function() {
    return splitToArray(this.get('directors'));
  }),

  actorsArray: Ember.computed('actors', function() {
    return splitToArray(this.get('actors'));
  }),

  ratings: Array.apply(0, Array(99)).map(function(value, index) { return (index + 1)/ 10; }),

  actions: {
    save() {
      this.sendAction('action', {
        title: this.get('title'),
        rating: this.get('rating'),
        directors: this.get('directorsArray'),
        actors: this.get('actorsArray')
      },

      (errors) => {
        this.set('errors', errors.filter(function(e) { return ['title', 'rating', 'actors', 'director'].contains(e.attribute) }));
      });
    }
  }
});
