import { CaseRecordsByState } from '@/store/RootState';
import { transformCaseRecordsToDataset } from '@/lib/transformations/transformToDatasets';
import { Dataset } from '@/lib/transformations/Dataset';

describe('transformToDatasets', () => {
  it('should transfrom a map of case records into a list of datasets', () => {
    const exampleData: CaseRecordsByState = {
      Berlin: {
        '2020-03-14': 123,
        '2020-03-15': 163,
      },
      Bayern: {
        '2020-03-14': 345,
        '2020-03-15': 485,
      },
    };

    const actualDatasets = transformCaseRecordsToDataset(exampleData);

    const expectedDatasets: Dataset[] = [
      {
        label: 'Berlin',
        data: [123, 163],
      },
      {
        label: 'Bayern',
        data: [345, 485],
      },
    ];
    expect(actualDatasets).toStrictEqual(expectedDatasets);
  });
});
