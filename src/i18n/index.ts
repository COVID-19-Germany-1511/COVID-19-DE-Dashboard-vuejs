import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  de: {
    type: {
      confirmed: 'Infektionen',
      deaths: 'Todesfälle',
    },
    subType: {
      total: 'Total',
      perPop: 'pro 100.000 Einwohner',
    },
  },
};

export const i18n = new VueI18n({
  locale: 'de',
  messages,
});
export default i18n;
