import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this.set('order', params.order);
    this.set('query', params.query);

    return this.loadModel();
  },

  setupController(controller) {
    controller.set('model', this.store.peekAll('movie'));
  },

  loadModel() {
    var params = {};

    params.page = this.get('nextPage');
    params.order = this.get('order');
    params.query = this.get('query');

    return this.store.query('movie', params).then((result) => {
      this.set('nextPage', result.get('meta.next'));
    });
  },

  actions: {
    queryParamsDidChange() {
      this.set('nextPage', 0);
      this.store.unloadAll('movie');
      this.refresh();
    },

    loadMore() {
      this.loadModel();
    },

    willTransition() {
      this.set('nextPage', 0);
    }
  }
});
