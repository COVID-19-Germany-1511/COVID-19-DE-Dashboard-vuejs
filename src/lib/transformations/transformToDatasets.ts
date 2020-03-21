import { Dataset } from '@/lib/transformations/Dataset';
import { CaseRecordsByState } from '@/store/RootState';

export const transformCaseRecordsToDataset = (
  records: CaseRecordsByState,
): Dataset[] => {
  return Object.keys(records).map(
    (stateName: string): Dataset => {
      return {
        label: stateName,
        data: Object.values(records[stateName]),
      };
    },
  );
};
