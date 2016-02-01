export default {
  name: 'cookies',
  after: ['cookie'],

  initialize: function(container, app) {
    app.inject('service', 'cookie', 'cookie:main');
  }
}
