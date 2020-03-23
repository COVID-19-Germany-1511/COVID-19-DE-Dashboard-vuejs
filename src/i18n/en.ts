import { TranslationKeys } from './de';

export const en: TranslationKeys = {
  general: {
    title: 'Covid-19 Dashboard Germany',
    date: 'Date: %{date}',
    language: 'Language',
  },
  type: {
    confirmed: 'infections',
    deaths: 'deaths',
  },
  subType: {
    total: 'total',
    perPop: 'per 100.000 inhabitants',
  },
  titles: {
    new: 'New %{type}',
    history: 'History %{type}',
    table: 'Statistics for: %{selection}',
  },
  averagedOver7DaysDesc: 'averaged over 7 days',
  logScale: 'shown with a logarithmic Y-axis',
};
