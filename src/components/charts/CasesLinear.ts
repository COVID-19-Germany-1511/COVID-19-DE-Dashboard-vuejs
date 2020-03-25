import { Line, mixins as vueChartJsMixins } from 'vue-chartjs';
import { mixins } from 'vue-class-component';
import { Component, Prop } from 'vue-property-decorator';
import { formatAbsoluteTickNumbers } from '@/lib/tickNumberFormat';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  mixins: [vueChartJsMixins.reactiveProp],
})
export default class CasesLinear extends mixins(Line) {
  @Prop({ required: true })
  public chartData!: ChartData;

  public options: ChartOptions | null = null;

  mounted() {
    this.options = {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: formatAbsoluteTickNumbers,
            },
          },
        ],
      },
      spanGaps: true,
    };

    this.renderChart(this.chartData, this.options);
  }
}
