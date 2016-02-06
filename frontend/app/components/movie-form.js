import Ember from 'ember';

function splitToArray(e) {
  if (e) {
    return e.split(',').map(function(value) { return value.trim(); });
  } else {
    return [];
  }
}

export default Ember.Component.extend({
  movie: null,
  actorsList: null,
  directorsList: null,

  init() {
    this._super();

    if (this.get('movie')) {
      this.set('title', this.get('movie.title'));
      this.set('rating', this.get('movie.rating'));
      this.set('actorsList', this.get('movie.actors').join(', '));
      this.set('directorsList', this.get('movie.directors').join(', '));
    }
  },

  directors: Ember.computed('directorsList', function() {
    return splitToArray(this.get('directorsList'));
  }),

  actors: Ember.computed('actorsList', function() {
    return splitToArray(this.get('actorsList'));
  }),

  rating: 0.1,
  ratings: Array.apply(0, Array(100)).map(function(value, index) { return (index + 1)/ 10; }),

  actions: {
    save() {
      this.sendAction('action', {
        title: this.get('title'),
        rating: this.get('rating'),
        directors: this.get('directors'),
        actors: this.get('actors')
      },

      (errors) => {
        this.set('errors', errors.filter(function(e) { return ['title', 'rating', 'actors', 'directors'].contains(e.attribute) }));
      });
    }
  }
});
