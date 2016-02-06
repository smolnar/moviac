import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('logout');
  this.route('signup');
  this.route('movies', function() {
    this.route('new');
  });

  this.route('movie', { path: '/movie/:movie_id' }, function() {
    this.route('edit');
  });
});

export default Router;
