import Ember from 'ember';
import Authenticable from '../../mixins/authenticable';

export default Ember.Route.extend(Authenticable, {
  model() {
    return this.store.createRecord('movie');
  },

  setupController(controller, model) {
    controller.set('model', model);
  },

  renderTemplate() {
    this.render({ into: 'application' });
  },

  actions: {
    willTransition() {
      this.controllerFor('movies/new').get('model').rollback();
    },

    saveMovie(attributes, callback) {
      var movie = this.controllerFor('movies/new').get('model');

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
