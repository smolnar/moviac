import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.loadModel();
  },

  setupController(controller) {
    controller.set('movies', this.store.peekAll('movie'));
  },

  loadModel(page) {
    return this.store.query('movie', { page: page }).then((result) => {
      this.set('nextPage', result.get('meta.next'));
    });
  },

  actions: {
    loadMore() {
      this.loadModel(this.get('nextPage'));
    },

    willTransition() {
      this.store.unloadAll('movie');
      this.set('nextPage', 0);
    }
  }
});
