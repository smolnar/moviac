import Ember from 'ember';

export default Ember.Component.extend({
  registration: Ember.inject.service(),

  name: null,
  email: null,
  password: null,

  actions: {
    signup() {
      var name = this.get('name');
      var email = this.get('email');
      var password = this.get('password');

      this.set('errors', null);
      this.set('password', null);

      this.get('registration').register(name, email, password).then(() => {
        this.sendAction();
      }, (errors) => {
        this.set('errors', errors);
      })
    }
  }
});
