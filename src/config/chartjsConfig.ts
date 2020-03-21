import { Chart as ChartGlobal } from 'chart.js';

export const setChartJsDefaults = (Chart: typeof ChartGlobal) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  Chart.defaults.global.datasets.line = { fill: false };
};
