import Ember from 'ember';
import Authenticable from '../../mixins/authenticable';

export default Ember.Route.extend(Authenticable, {
  actions: {
    createMovie(attributes, callback) {
      var movie = this.store.createRecord('movie', attributes);

      movie.save().then(() => {
        this.transitionTo('movies');
      }, () => {
        movie.rollback();

        callback(movie.get('errors'));
      });
    }
  }
});
