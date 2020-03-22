<template>
  <div class="hello">
    <h1>Examples of available charts</h1>

    <div class="row">
      <div class="col-lg-6">
        <ConfirmedCases />
      </div>
      <div class="col-lg-6">
        <Deaths />
      </div>
      <div class="col-lg-6">
        <ConfirmedCases :logarithmic="true" />
      </div>
      <div class="col-lg-6">
        <Deaths :logarithmic="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import ConfirmedCases from '@/components/charts/ConfirmedCases.vue';
import { mixins } from 'vue-class-component';
import StateMixin from '@/components/stateMixin';
import Deaths from '@/components/charts/Deaths.vue';

@Component({
  components: {
    ConfirmedCases,
    Deaths,
  },
})
export default class CdgCharts extends mixins(StateMixin) {
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
