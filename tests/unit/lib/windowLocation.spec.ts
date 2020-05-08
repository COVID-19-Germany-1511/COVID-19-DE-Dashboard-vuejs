import {
  getAveragedFromSearchParams,
  getScaleTypeFromSearchParams,
  getStatesFromSearchParams,
  updateWindowLocation,
} from '@/lib/windowLocation';

function setWindowSearchString(queryString: string) {
  delete window.location;
  Object.defineProperty(window, 'location', {
    value: { search: queryString },
    writable: true,
  });
}

function setWindowSearchHash(hash: string) {
  delete window.location;
  Object.defineProperty(window, 'location', {
    value: { hash },
    writable: true,
  });
}

describe('getAveragedFromSearchParams', () => {
  it('should return true for the string "true"', () => {
    setWindowSearchString('?averaged=true');

    expect(getAveragedFromSearchParams()).toBe(true);
  });

  it('should return false for the string "false"', () => {
    setWindowSearchString('?averaged=false');

    expect(getAveragedFromSearchParams()).toBe(false);
  });

  it('should return false some other string', () => {
    setWindowSearchString('?averaged=foo');

    expect(getAveragedFromSearchParams()).toBe(false);
  });

  it('should return false the empty string', () => {
    setWindowSearchString('?averaged=');

    expect(getAveragedFromSearchParams()).toBe(false);
  });

  it('should return false if the parameter is missing', () => {
    setWindowSearchString('?yAxisScaling=linear');

    expect(getAveragedFromSearchParams()).toBe(false);
  });

  it('should return false if there is no search param', () => {
    setWindowSearchString('');

    expect(getAveragedFromSearchParams()).toBe(false);
  });
});

describe('getScaleTypeFromSearchParams', () => {
  it('should return linear if the parameter is "linear"', () => {
    setWindowSearchString('?yAxisScaling=linear');

    expect(getScaleTypeFromSearchParams()).toBe('linear');
  });

  it('should return logarithmic if the parameter is "logarithmic"', () => {
    setWindowSearchString('?yAxisScaling=logarithmic');

    expect(getScaleTypeFromSearchParams()).toBe('logarithmic');
  });

  it('should return linear if the parameter is something else', () => {
    setWindowSearchString('?yAxisScaling=foo');

    expect(getScaleTypeFromSearchParams()).toBe('linear');
  });

  it('should return linear if the parameter is the empty string', () => {
    setWindowSearchString('?yAxisScaling=');

    expect(getScaleTypeFromSearchParams()).toBe('linear');
  });

  it('should return linear if the parameter is missing', () => {
    setWindowSearchString('?averaged=foo');

    expect(getScaleTypeFromSearchParams()).toBe('linear');
  });

  it('should return linear if there is no search param', () => {
    setWindowSearchString('');

    expect(getScaleTypeFromSearchParams()).toBe('linear');
  });
});

describe('updateWindowLocation', () => {
  let historySpy: jest.SpyInstance;

  beforeEach(() => {
    historySpy = jest.spyOn(window.history, 'pushState');
  });

  afterEach(() => {
    historySpy.mockRestore();
  });

  it('build the url based on the params and push it to the history', () => {
    setWindowSearchHash('');

    updateWindowLocation({
      averaged: true,
      yAxisScaling: 'linear',
      states: [],
    });

    expect(historySpy).toHaveBeenCalledWith(
      null,
      '',
      '?yAxisScaling=linear&averaged=true',
    );
  });

  it('should keep the hash', () => {
    setWindowSearchHash('#foo');

    updateWindowLocation({
      averaged: true,
      yAxisScaling: 'linear',
      states: [],
    });

    expect(historySpy).toHaveBeenCalledWith(
      null,
      '',
      '?yAxisScaling=linear&averaged=true#foo',
    );
  });

  it('adds state if they are selected', () => {
    setWindowSearchHash('');

    updateWindowLocation({
      averaged: true,
      yAxisScaling: 'linear',
      states: ['Sachsen', 'Berlin'],
    });

    expect(historySpy).toHaveBeenCalledWith(
      null,
      '',
      '?yAxisScaling=linear&averaged=true&states=Sachsen,Berlin',
    );
  });
});

describe('getStatesFromSearchParams', () => {
  it('should return valid states', () => {
    setWindowSearchString('?states=Bayern,Berlin');

    const validStates = ['Bayern', 'Berlin', 'Sachsen'];

    expect(getStatesFromSearchParams(validStates)).toStrictEqual([
      'Bayern',
      'Berlin',
    ]);
  });

  it('should remove invalid states', () => {
    setWindowSearchString('?states=Bayern,Berlin,foo');

    const validStates = ['Bayern', 'Berlin', 'Sachsen'];

    expect(getStatesFromSearchParams(validStates)).toStrictEqual([
      'Bayern',
      'Berlin',
    ]);
  });

  it('should return empty list if param is missing', () => {
    setWindowSearchString('?averaged=foo');

    const validStates = ['Bayern', 'Berlin', 'Sachsen'];

    expect(getStatesFromSearchParams(validStates)).toStrictEqual([]);
  });

  it('should return empty list if param is empty string', () => {
    setWindowSearchString('?states=');

    const validStates = ['Bayern', 'Berlin', 'Sachsen'];

    expect(getStatesFromSearchParams(validStates)).toStrictEqual([]);
  });
});
