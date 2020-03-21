<template>
  <div class="hello">
    <h1>Examples of available charts</h1>

    <div class="row">
      <div class="col-lg-6">
        <ConfirmedCasesLinear
          :confrimed-data="this.rootModule.state.confirmed"
        />
      </div>
      <div class="col-lg-6">
        <DeathsLinear :deaths="this.rootModule.state.deaths" />
      </div>
      <div class="col-lg-6">
        <ConfirmedCasesLog :confrimed-data="this.rootModule.state.confirmed" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import ConfirmedCasesLinear from '@/components/charts/ConfirmedCasesLinear.vue';
import { mixins } from 'vue-class-component';
import StateMixin from '@/components/stateMixin';
import DeathsLinear from '@/components/charts/DeathsLinear.vue';
import ConfirmedCasesLog from '@/components/charts/ConfirmedCasesLog.vue';

@Component({
  components: {
    ConfirmedCasesLinear,
    ConfirmedCasesLog,
    DeathsLinear,
  },
})
export default class ExampleCharts extends mixins(StateMixin) {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 1em;
  margin-left: 1em;
}
.col-lg-6 {
  flex: 0 0 50%;
  max-width: 50%;
}
</style>
