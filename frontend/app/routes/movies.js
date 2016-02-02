import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this.set('order', params.order);

    return this.loadModel({ order: params.order });
  },

  setupController(controller) {
    controller.set('model', this.store.peekAll('movie'));
  },

  loadModel(params) {
    var order = params.order || this.get('order');
    var page = params.page || this.get('nextPage');

    return this.store.query('movie', { page: params.page, order: params.order }).then((result) => {
      this.set('nextPage', result.get('meta.next'));
    });
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },

    loadMore() {
      this.loadModel({ page: this.get('nextPage') });
    },

    willTransition() {
      this.store.unloadAll('movie');
      this.set('nextPage', 0);
    }
  }
});
