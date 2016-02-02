import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('movie', { page: this.get('page') }).then((result) => {
      this.set('page', result.get('meta.page'));
    });
  },

  setupController(controller) {
    controller.set('movies', this.store.peekAll('movie'));
  },

  actions: {
    loadMore() {
      this.set('page', this.get('page') + 1);

      this.refresh();
    }
  }
});
