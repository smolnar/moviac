import Ember from 'ember';
import Authenticable from '../../mixins/authenticable';

export default Ember.Route.extend(Authenticable, {
  setupController(controller, model) {
    controller.set('model', model);
  },

  actions: {
    saveMovie(attributes, callback) {
      var movie = this.controllerFor('movie/edit').get('model');

      movie.setProperties({
        title: attributes.title,
        rating: attributes.rating,
        actors: attributes.actors,
        directors: attributes.directors
      });

      movie.save().then(() => {
        this.transitionTo('movies');
      }, () => {
        callback(movie.get('errors'));
      });
    }
  }
});
