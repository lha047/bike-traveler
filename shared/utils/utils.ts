import { AllInfoStation, Station } from '../model/Station';
import { StationStatus } from '../model/StationStatus';

export const mapStationAndStatus = (
  stations: Station[],
  statuses: StationStatus[]
): AllInfoStation[] => {
  return statuses.map((status: StationStatus) => {
    const { station_id } = status;
    const info = stations.find((s: Station) => s.station_id === station_id);
    return { ...status, ...info } as AllInfoStation;
  });
};
