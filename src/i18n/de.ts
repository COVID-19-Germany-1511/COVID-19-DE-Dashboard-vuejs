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
    new: {
      confirmed: 'Neue Infektionen',
      deaths: 'Neue Todesfälle',
    },
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
  buttonLabel: {
    logarithmic: 'Zeige einige Diagramme mit logarithmischer Y-Achse',
    linear: 'Zeige alle Diagramme mit linearer Y-Achse',
    daily: 'Zeige alle Diagramme mit täglichen Daten',
    averaged: 'Zeige einige Diagramme mit gemittelten Daten',
  },
  averagedOver7DaysDesc: 'Gemittelt über 7 Tage.',
  logScale: 'Mit einer logarithmischen Y-Achse dargestellt.',
};

export type TranslationKeys = typeof de;
