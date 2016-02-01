import Ember from 'ember';
import AuthenticableMixin from '../../../mixins/authenticable';
import { module, test } from 'qunit';

module('Unit | Mixin | authenticable');

// Replace this with your real tests.
test('it works', function(assert) {
  let AuthenticableObject = Ember.Object.extend(AuthenticableMixin);
  let subject = AuthenticableObject.create();
  assert.ok(subject);
});
