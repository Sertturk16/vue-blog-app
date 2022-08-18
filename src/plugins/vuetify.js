import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify, {
  theme: {
    'primary': '#FF5C8D',
    'primary--text': '#FF5C8D',
    'secondary': '#524A4E',
    'seconday--text': '#524A4E'
  }
});

export default new Vuetify({
});
