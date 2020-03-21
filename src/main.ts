import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Chart from 'chart.js';
import { setChartJsDefaults } from '@/config/chartjsConfig';

setChartJsDefaults(Chart);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
