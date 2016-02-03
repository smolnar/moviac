import Ember from 'ember';
import Authenticable from '../../mixins/authenticable';

export default Ember.Route.extend(Authenticable, {
  model() {
    this.store.createRecord('movie');
  },

  actions: {
    createMovie(attributes, callback) {
      var movie = this.store.createRecord('movie', attributes);

      movie.save().then(() => {
        this.transitionTo('movies');
      }, () => {
        callback(movie.get('errors'));
      });
    }
  }
});
