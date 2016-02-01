import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  actions: {
    login() {
      var email = this.get('email');
      var password = this.get('password');

      this.set('error', null);

      this.get('session').login(email, password).then(() => {
        this.sendAction();
      }, (error) => {
        this.set('error', error);
      })
    }
  }
});
