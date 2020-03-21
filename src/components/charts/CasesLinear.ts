import { Line } from 'vue-chartjs';
import { mixins } from 'vue-class-component';
import { Component, Prop } from 'vue-property-decorator';
import { Dataset } from '@/lib/transformations/Dataset';
import { formatAbsoluteTickNumbers } from '@/lib/tickNumberFormat';

@Component
export default class CasesLinear extends mixins(Line) {
  @Prop({ required: true })
  public dates!: string[];

  @Prop({ required: true })
  public dataSets!: Dataset[];

  mounted() {
    const data = {
      datasets: this.dataSets,
      labels: this.dates,
    };
    const options = {
      scales: {
        yAxes: [
          {
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
