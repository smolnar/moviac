import Ember from 'ember';

export default Ember.Controller.extend({
  previousTransition: null,

  actions: {
    transitionToAfterLogin() {
      var transition = this.get('previousTransition');

      if (transition) {
        transition.retry()

        this.set('previousTransition', null)
      } else {
        this.transitionToRoute('movies');
      }
    }
  }
});
