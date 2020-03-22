import { Line, mixins as vueChartJsMixins } from 'vue-chartjs';
import { mixins } from 'vue-class-component';
import { Component, Prop } from 'vue-property-decorator';
import { formatPercentNumbers } from '@/lib/tickNumberFormat';
import { ChartData } from 'chart.js';

@Component({
  mixins: [vueChartJsMixins.reactiveProp],
})
export default class PercentageLinear extends mixins(Line) {
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
            ticks: {
              callback: formatPercentNumbers,
            },
          },
        ],
      },
    };
    this.renderChart(this.chartData, options);
  }
}
