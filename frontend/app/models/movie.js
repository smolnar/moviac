import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  rating: DS.attr('number'),
  directors: DS.attr('array', { defaultValue: [] }),
  actors: DS.attr('array', { defaultValue: [] }),
  posterUrl: DS.attr('string'),
  plot: DS.attr('string'),
  year: DS.attr('number'),
  tagline: DS.attr('string')
});
