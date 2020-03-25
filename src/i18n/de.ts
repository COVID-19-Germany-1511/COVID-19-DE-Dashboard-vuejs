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
    history: {
      confirmed: 'Verlauf Infektionen',
      deaths: 'Verlauf Todesfälle',
    },
    table: 'Statistiken für: %{selection}',
    newRelative: {
      confirmed: 'Neue Infektionen relativ zu den Gesamtinfektionen',
      deaths: 'Neue Todesfälle relativ zu den Gesamttodesfällen',
    },
    mortality: 'Letalität (Todesfälle/Gesamtinfektionen, CFR)',
    growthFactor: {
      confirmed:
        'Wachstumsfaktor (Neue Infektionen/Neue Infektionen am Vortag)',
      deaths: 'Wachstumsfaktor (Neue Todesfälle/Neue Todesfälle am Vortag)',
    },
  },
  averagedOver7DaysDesc: 'Gemittelt über 7 Tage.',
  logScale: 'Mit einer logarithmischen Y-Achse dargestellt.',
};

export type TranslationKeys = typeof de;
