import { mapStationAndStatus } from './../shared/utils/utils';
import { StationStatusResponse } from '../shared/model/StationStatus';
import { StationResponse } from '../shared/model/Station';

export const stationsResponse: StationResponse = {
  data: {
    stations: [
      {
        station_id: '1',
        name: 'test station',
        address: 'Some address',
        capacity: 8,
      },
      {
        station_id: '2',
        name: 'Sesam station',
        address: 'My street',
        capacity: 12,
      },
    ],
  },
  last_updated: 0,
};
export const statusesResponse: StationStatusResponse = {
  data: {
    stations: [
      { station_id: '1', num_bikes_available: 4, num_docks_available: 4 },
      { station_id: '2', num_bikes_available: 6, num_docks_available: 12 },
    ],
  },
};
export const statuses = statusesResponse.data.stations;
export const stations = stationsResponse.data.stations;
export const allInfoMock = mapStationAndStatus(stations, statuses);
