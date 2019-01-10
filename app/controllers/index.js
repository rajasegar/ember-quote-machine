import Ember from 'ember';
import palettes from '../constants/palettes';
import fonts from '../constants/fonts';
import {computed} from '@ember/object';


export default Ember.Controller.extend({
  palettes: palettes,
  fonts: fonts,
  themes: computed('currentTheme', function() {
    let palette = this.get('currentTheme');
    let colors = palette.split(",");
    let themes = this.makePairs(colors);
    return themes;
  }),
  init() {
    this.set('currentTheme', palettes[0].colors);
    this.set('font', 'Roboto');
    this.set('quote', 'Make a user interface as consistent and as predictable as possible.');
  },
  actions: {
    setTheme(selected) {
      this.set('currentTheme', selected);
    },
    setFont(selected) {
      this.set('font', selected);
    }
  },
  makePairs(a) {
    let pairs = [];

    a.forEach(function(x) {
      let filtered = a.filter((y) => x != y);
      filtered.forEach(function(z) {
        let pair = [x, z];
        pairs.push(pair);
      });
    });

    return pairs;
  }
});
