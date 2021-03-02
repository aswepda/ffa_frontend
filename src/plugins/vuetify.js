import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import de from 'vuetify/lib/locale/de';
import '@mdi/font/css/materialdesignicons.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { de },
      current: 'de',
    }
});
