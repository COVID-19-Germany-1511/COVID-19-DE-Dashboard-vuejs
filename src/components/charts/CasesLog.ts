import { Line } from 'vue-chartjs';
import { mixins } from 'vue-class-component';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Dataset } from '@/lib/transformations/Dataset';
import { formatAbsoluteTickNumbers } from '@/lib/tickNumberFormat';

@Component
export default class CasesLinear extends mixins(Line) {
  @Prop({ required: true })
  public dates!: string[];

  @Prop({ required: true })
  public dataSets!: Dataset[];

  @Watch('dataSets')
  onDatasetsChanged() {
    this.drawChart();
  }

  @Watch('dates')
  onDatesChanged() {
    this.drawChart();
  }

  mounted() {
    this.drawChart();
  }

  private drawChart() {
    const data = {
      datasets: this.dataSets,
      labels: this.dates,
    };
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
    this.renderChart(data, options);
  }
}
