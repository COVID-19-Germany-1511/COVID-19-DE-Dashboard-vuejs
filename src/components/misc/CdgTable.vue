<template>
  <table class="big-number-wrapper">
    <colgroup>
      <col />
      <col class="confirmed" />
      <col class="deaths" />
    </colgroup>
    <thead>
      <tr>
        <td></td>
        <th scope="col" class="confirmed">
          <svg-sprite name="confirmed" />
          <span v-t="'type.confirmed'"></span>
        </th>
        <th scope="col" class="deaths">
          <svg-sprite name="deaths" />
          <span v-t="'type.deaths'"></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in entries" :key="entry.subType">
        <th scope="row" v-t="`subType.${entry.subType}`"></th>
        <td class="confirmed">
          <button
            @click="selectType('confirmed', entry.subType)"
            @mouseover="selectType('confirmed', entry.subType)"
          >
            {{ entry.confirmed }}
          </button>
        </td>
        <td class="deaths">
          <button
            @click="selectType('deaths', entry.subType)"
            @mouseover="selectType('deaths', entry.subType)"
          >
            {{ entry.deaths }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import StateMixin from '@/components/stateMixin';
import SvgSprite from '@/components/misc/SvgSprite.vue';
import { StatType, StatSubType } from '@/store/RootState';

function mapObject(
  data: { [key: string]: number },
  mapFunction: (param: number) => number | string,
): { [key: string]: number | string } {
  const result: any = {};
  Object.entries(data).forEach(([key, value]) => {
    result[key] = mapFunction(value);
  });
  return result;
}

@Component({
  components: {
    SvgSprite,
  },
})
export default class CdgTable extends Mixins(StateMixin) {
  get entries() {
    const { population } = this.rootModule.getters.selectedStatesMeta;
    const data = this.rootModule.getters.dataOfDateAndStates;
    const result = [];
    result.push({ subType: 'total', ...data });
    result.push({
      subType: 'perPop',
      ...mapObject(data, value => {
        const count: number | string = (value / population) * 100000;
        return count.toLocaleString(undefined, { maximumFractionDigits: 2 });
      }),
    });
    return result;
  }

  selectType(type: StatType, subType: StatSubType) {
    this.rootModule.actions.selectType({ type, subType });
  }
}
</script>

<style lang="scss" scoped>
$color-bg-confirmed-col: mix($color-confirmed, $color-bg, 50%);
$color-bg-deaths-col: mix($color-deaths, $color-bg, 50%);

.count-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: -10px;
}

.cdg-big-number {
  // @include ratio(0.67);
  min-width: 200px;
  max-width: 300px;
  width: calc(50% - 20px);
  margin: 15px 10px;
  background: $color-bg-lighter;
}

.confirmed,
.deaths {
  position: relative;
  z-index: 1;
  color: lighten($color-text, 20%);

  &:before {
    position: absolute;
    top: 0;
    left: 10px;
    right: 10px;
    bottom: 0;
    z-index: -1;
    display: block;
    content: '';
  }
}

.confirmed {
  &:before {
    background: $color-bg-confirmed-col;
  }

  svg {
    color: lighten(saturate($color-confirmed, 10%), 2%);
  }
}

.deaths {
  &:before {
    background: $color-bg-deaths-col;
  }

  svg {
    color: lighten(saturate($color-deaths, 20%), 5%);
  }
}

svg {
  width: 2 * map-get($font-size-h1, base);
  height: 2 * map-get($font-size-h1, base);
}

thead th {
  @extend %subline;
  padding: 1.25rem 2rem 0.5rem;

  span {
    display: block;
    margin-top: 0.75rem;
  }
}

tbody {
  th {
    @extend %font-small-1;
  }
}

thead th,
td {
  text-align: center;
}

td {
  @extend %cdg-h1;
  margin: 0 0.5rem;
  padding: 1rem 2rem;
}
tr:last-child td {
  padding-bottom: 1.5rem;
}
</style>
