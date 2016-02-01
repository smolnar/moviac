import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  token: null,
  user: null,

  init() {
    this._super();

    var token = this.cookie.getCookie('token');
    var userId = this.cookie.getCookie('userId');

    if (!Ember.isEmpty(token) && !Ember.isEmpty(userId)) {
      this.set('token', token);
      this.set('user', this.get('store').findRecord('user', userId));
    }
  },

  login(email, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: '/api/sessions',
        headers: {
          'Accept': 'application/vnd.moviac.v1+json'
        },
        data: {
          email: email,
          password: password
        }
      }).then((data) => {
        this.loginFromPayload(data);

        resolve();
      }, (data) => {
        reject('Email or password are not correct.');
      })
    })
  },

  loginFromPayload(payload) {
    this.set('token', payload['meta']['token']);
    this.get('store').pushPayload(payload);
    this.set('user', this.get('store').peekRecord('user', payload['user']['id']));
  },

  logout() {
    this.set('token', null);
    this.set('user', null);
  },

  tokenAndUserChanged: Ember.observer('token', 'user', function() {
    var token = this.get('token');
    var user = this.get('user');

    if (!token || !user) {
      this.cookie.removeCookie('token');
      this.cookie.removeCookie('userId');
    } else {
      this.cookie.setCookie('token', token);
      this.cookie.setCookie('userId', user.get('id'));
    }
  })
});
