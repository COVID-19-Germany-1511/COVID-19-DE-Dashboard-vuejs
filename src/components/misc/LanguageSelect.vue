<template>
  <cdg-select
    name="language-select"
    :items="availableLocales"
    itemText="name"
    itemValue="locale"
    v-model="locale"
  >
    {{ $t('general.language') }}
  </cdg-select>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CdgSelect from '@/components/form/CdgSelect.vue';

const localeNames = {
  de: 'Deutsch',
  en: 'English',
};
type availableLocales = keyof typeof localeNames;
type ValueOf<T> = T[keyof T];
type localeForSelect = {
  name: ValueOf<typeof localeNames>;
  locale: availableLocales;
};

@Component({
  components: {
    CdgSelect,
  },
})
export default class LanguageSelect extends Vue {
  get locale() {
    const locale = this.$i18n.locale as availableLocales;
    return { name: localeNames[locale as availableLocales], locale };
  }

  set locale({ locale }: localeForSelect) {
    this.$i18n.locale = locale;
  }

  get availableLocales() {
    return this.$i18n.availableLocales.map(locale => {
      return { name: localeNames[locale as availableLocales], locale };
    });
  }
}
</script>

<style lang="scss" scoped>
/deep/ label {
  @extend %sr-only;
}
</style>
