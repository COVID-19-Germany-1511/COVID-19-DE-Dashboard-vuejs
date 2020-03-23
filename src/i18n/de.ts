export const de = {
  general: {
    title: 'Covid-19 Dashboard Deutschland',
    date: 'Datum: %{date}',
    language: 'Sprache',
  },
  type: {
    confirmed: 'Infektionen',
    deaths: 'Todesfälle',
  },
  subType: {
    total: 'Total',
    perPop: 'pro 100.000 Einwohner',
  },
  titles: {
    new: 'Neue %{type}',
    history: 'Verlauf %{type}',
    table: 'Statistiken für: %{selection}',
  },
  averagedOver7DaysDesc: 'Gemittelt über 7 Tage.',
  logScale: 'Mit einer logarithmischen Y-Achse dargestellt.',
};

export type TranslationKeys = typeof de;
