import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service(),

  beforeModel(transition) {
    if (!this.get('session.token')) {
      this.redirectToLoginRoute(transition);
    }
  },

  redirectToLoginRoute(transition) {
    var controller = this.controllerFor('login')

    controller.set('previousTransition', transition)
    this.transitionTo('login')
  },

  actions: {
    error(response, transition) {
      if (response.reason === 401) {
        this.get('session').reset();

        this.redirectToLoginRoute(transition);
      } else {
        // TODO Handle other errors
      }
    }
  }
});
