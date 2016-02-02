import Ember from 'ember';

export default Ember.Component.extend({
  itemsShowed: 10,
  collapsed: true,

  formatedList: Ember.computed('list', 'itemsShowed', function() {
    return this.get('list').slice(0, this.get('itemsShowed') - 1).join(', ');
  }),

  actions: {
    show() {
      this.set('itemsShowed', this.get('list.length'));
      this.set('collapsed', false);
    },

    collapse() {
      this.set('itemsShowed', 10);
      this.set('collapsed', true);
    }
  }
});
