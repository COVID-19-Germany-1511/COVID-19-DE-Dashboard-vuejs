<template>
  <div class="hello">
    <h1>Examples of available charts</h1>

    <div class="row">
      <div class="col-lg-6">
        <ConfirmedCasesLinear
          :confrimed-data="this.rootModule.state.confirmed"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import ConfirmedCasesLinear from '@/components/charts/ConfirmedCasesLinear.vue';
import { mixins } from 'vue-class-component';
import StateMixin from '@/components/stateMixin';

@Component({
  components: {
    ConfirmedCasesLinear,
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
  margin-right: -14px;
  margin-left: -14px;
}
.col-lg-6 {
  flex: 0 0 50%;
  max-width: 50%;
}
</style>
