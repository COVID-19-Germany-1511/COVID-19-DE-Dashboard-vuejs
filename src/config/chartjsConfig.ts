import { Chart as ChartGlobal } from 'chart.js';

export const setChartJsDefaults = (Chart: typeof ChartGlobal) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  Chart.defaults.global.datasets.line = { fill: false };

  // deactivate non-reactive toggling of lines via clicking the legend
  if (!Chart.defaults.global.legend) {
    Chart.defaults.global.legend = {};
  }
  Chart.defaults.global.legend.onClick = undefined;

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  Chart.defaults.global.defaultFontColor = '#999999';

  Chart.defaults.global.tooltips = {
    ...Chart.defaults.global.tooltips,
    mode: 'index',
    intersect: false,
    titleFontSize: 18,
    bodyFontSize: 18,
  };
};
