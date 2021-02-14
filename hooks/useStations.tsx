import { StationResponse } from '../shared/model/Station';
import { getStations } from '../shared/fetchHelpers';
import { useQuery, UseQueryResult } from 'react-query';
import { Nullable } from '../shared/utils/helperTypes';

export const useStations = (
  stations: Nullable<StationResponse>
): UseQueryResult => {
  return useQuery<StationResponse, Error>('stations', getStations, {
    ...(stations && { initialData: stations }),
    enabled: !stations,
  });
};
