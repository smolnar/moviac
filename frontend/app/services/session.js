import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  token: null,
  user: null,

  init() {
    this._super();

    var token = this.cookie.getCookie('token', { path: '/' });
    var userId = this.cookie.getCookie('userId', { path: '/' });

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

    delete payload['meta']['token'];

    this.get('store').pushPayload(payload);
    this.set('user', this.get('store').peekRecord('user', payload['user']['id']));
  },

  logout() {
    this.set('token', null);
    this.set('user', null);
  },

  tokenAndUserChanged: Ember.observer('token', 'user', function() {
    Ember.run.once(this, () => {
      var token = this.get('token');
      var user = this.get('user');

      if (!token || !user) {
        this.cookie.removeCookie('token', { path: '/' });
        this.cookie.removeCookie('userId', { path: '/' });
      } else {
        this.cookie.setCookie('token', token, { path: '/' });
        this.cookie.setCookie('userId', user.get('id'), { path: '/' });
      }
    });
  })
});
