import {
  stations as stationsData,
  statuses as statusData,
} from './../../tests/mockResponse';
import { mapStationAndStatus } from './utils';
describe('utils', () => {
  test('mapStationAndStatus - handles null', () => {
    const stations = null;
    const statuses = null;
    const res = mapStationAndStatus(stations, statuses);
    expect(res).toEqual([]);
  });
  test('mapStationAndStatus - handles empty array', () => {
    const stations = [];
    const statuses = [];
    const res = mapStationAndStatus(stations, statuses);
    expect(res).toEqual([]);
  });
  test('mapStationAndStatus - handles empty array and null', () => {
    const stations = null;
    const statuses = [];
    const res = mapStationAndStatus(stations, statuses);
    expect(res).toEqual([]);
  });
  test('mapStationAndStatus - maps correctly', () => {
    const stations = stationsData;
    const statuses = statusData;
    const res = mapStationAndStatus(stations, statuses);
    expect(res.length).toEqual(stations.length);
    expect(res[0].name).toEqual(stations[0].name);
    expect(res[0].num_bikes_available).toEqual(statuses[0].num_bikes_available);
    expect(res[0].num_docks_available).toEqual(statuses[0].num_docks_available);
  });
});
