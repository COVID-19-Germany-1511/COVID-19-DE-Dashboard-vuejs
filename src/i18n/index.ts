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
    newIncidentsHeadline: {
      confirmed: 'Neue Infektionen',
      deaths: 'Neues Todesfälle',
    },
    incidentsHeadline: {
      confirmed: 'Verlauf der Infektionen',
      deaths: 'Verlauf der Todesfälle',
    },
    averagedOver7DaysDesc: 'Gemittelt über 7 Tage.',
    logScale: 'Mit einer logarithmischen Y-Achse dargestellt.',
  },
};

export const i18n = new VueI18n({
  locale: 'de',
  messages,
});
export default i18n;
