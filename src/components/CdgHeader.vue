<template>
  <header>
    <h1 v-t="'general.title'" />
    <language-select />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LanguageSelect from '@/components/misc/LanguageSelect.vue';

@Component({
  components: {
    LanguageSelect,
  },
})
export default class CdgHeader extends Vue {}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.75rem 1rem;
}

h1,
/deep/ .input-field {
  margin: 0;
}
</style>
