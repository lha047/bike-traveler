import { useQuery, UseQueryResult } from 'react-query';
import { StationStatusResponse } from '../shared/model/StationStatus';
import { getStatuses } from '../shared/fetchHelpers';
import { Nullable } from '../shared/utils/helperTypes';

export const useStatuses = (
  statuses: Nullable<StationStatusResponse>
): UseQueryResult => {
  return useQuery<StationStatusResponse, Error>('status', getStatuses, {
    ...(statuses && { initialData: statuses }),
    enabled: !statuses,
  });
};
