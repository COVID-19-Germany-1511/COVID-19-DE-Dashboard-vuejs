import { ScaleType } from '@/store/RootState';

export function updateWindowLocation({
  yAxisScaling,
  averaged,
  states,
}: {
  yAxisScaling: string;
  averaged: boolean;
  states: string[];
}): void {
  const hash = window.location.hash;
  const query: Record<string, boolean | string | string[]> = {
    yAxisScaling,
    averaged,
    ...(states.length && { states }),
  };
  const queryString = Object.entries(query)
    .map(([key, value]) => {
      return `${key}=${Array.isArray(value) ? value.join(',') : value}`;
    })
    .join('&');
  const relativeUrl = `?${queryString}${hash}`;
  window.history.pushState(null, '', relativeUrl);
}

export function getScaleTypeFromSearchParams(): ScaleType {
  const queryScaleType = new URLSearchParams(window.location.search).get(
    'yAxisScaling',
  );
  if (queryScaleType === null) {
    return 'linear';
  }
  return ['linear', 'logarithmic'].includes(queryScaleType)
    ? (queryScaleType as ScaleType)
    : 'linear';
}

export function getAveragedFromSearchParams(): boolean {
  return new URLSearchParams(window.location.search).get('averaged') === 'true';
}

export function getStatesFromSearchParams(validStates: string[]): string[] {
  const stateString = new URLSearchParams(window.location.search).get('states');
  if (stateString === null) {
    return [];
  }
  const paramStates = stateString.split(',');
  return paramStates.filter(paramState => validStates.includes(paramState));
}
