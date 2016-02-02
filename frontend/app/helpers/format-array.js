import Ember from 'ember';

export function formatArray(params, hash) {
  if (params[0]) {
    return params[0].join(', ');
  }
}

export default Ember.Helper.helper(formatArray);
