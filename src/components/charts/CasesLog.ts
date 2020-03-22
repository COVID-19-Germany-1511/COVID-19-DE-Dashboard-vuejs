import { Line, mixins as vueChartJsMixins } from 'vue-chartjs';
import { mixins } from 'vue-class-component';
import { Component, Prop } from 'vue-property-decorator';
import { formatAbsoluteTickNumbers } from '@/lib/tickNumberFormat';
import { ChartData } from 'chart.js';

@Component({
  mixins: [vueChartJsMixins.reactiveProp],
})
export default class CasesLog extends mixins(Line) {
  @Prop({ required: true })
  public chartData!: ChartData;

  mounted() {
    this.drawChart();
  }

  private drawChart() {
    const options = {
      scales: {
        yAxes: [
          {
            type: 'logarithmic',
            ticks: {
              callback: formatAbsoluteTickNumbers,
            },
          },
        ],
      },
    };
    this.renderChart(this.chartData, options);
  }
}
