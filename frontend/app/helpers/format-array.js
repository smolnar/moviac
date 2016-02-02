import Ember from 'ember';

export function formatArray(params, hash) {
  return params[0].join(', ');
}

export default Ember.Helper.helper(formatArray);
