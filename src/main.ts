import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Chart from 'chart.js';
import '@/scss/main.scss';
import { i18n } from './i18n';

import { setChartJsDefaults } from '@/config/chartjsConfig';

setChartJsDefaults(Chart);

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
