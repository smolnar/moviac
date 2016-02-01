import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  session: Ember.inject.service(),
  namespace: '/api',
  headers: Ember.computed('session.token', 'session.user', function() {
    return {
      'Accept': 'application/vnd.moviac.v1+json',
      'Authorization': 'Token token="' + this.get('session.token') + '", email="' + this.get('session.user.email') + '"'
    }
  })
});
