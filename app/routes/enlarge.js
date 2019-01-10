import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    fg: {
      refreshModel: true
    },
    bg: {
      refreshModel: true
    },
    font: {
      refreshModel: true
    },
    quote: {
      refreshModel: true
    }
  }

});
