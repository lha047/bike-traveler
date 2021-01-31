import { Nullable } from './helperTypes';
import { AllInfoStation, Station } from '../model/Station';
import { StationStatus } from '../model/StationStatus';

export const mapStationAndStatus = (
  stations: Nullable<Station[]>,
  statuses: Nullable<StationStatus[]>
): AllInfoStation[] => {
  if (!stations || !statuses) {
    return [];
  }
  return statuses.map((status: StationStatus) => {
    const { station_id } = status;
    const info = stations.find((s: Station) => s.station_id === station_id);
    return { ...status, ...info } as AllInfoStation;
  });
};

export const unixToMs = (unix: number): number => {
  return unix * 1000;
};
