import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  actions: {
    transitionToAfterSignUp() {
      this.transitionTo('movies');
    }
  }
});
