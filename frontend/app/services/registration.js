import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  register(name, email, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: '/api/users',
        headers: {
          'Accept': 'application/vnd.moviac.v1+json'
        },

        data: {
          user: {
            name: name,
            email: email,
            password: password
          }
        }
      }).then((data) => {
        this.get('session').loginFromPayload(data);

        resolve();
      }, (data) => {
        reject(data.responseJSON.errors);
      })
    })
  }
});
