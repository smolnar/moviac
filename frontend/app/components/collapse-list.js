import Ember from 'ember';

export default Ember.Component.extend({
  itemsShowed: 10,
  collapsed: true,

  formatedList: Ember.computed('list', 'itemsShowed', function() {
    return this.get('list').slice(0, this.get('itemsShowed')).join(', ');
  }),

  canShowCollapseButton: Ember.computed('list.length', function() {
    return this.get('list.length') > 10;
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
