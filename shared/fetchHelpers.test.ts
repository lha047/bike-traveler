import {
  getStatuses,
  API_STATUS_URL,
  options,
  getStations,
  API_STATIONS_URL,
} from './fetchHelpers';
global.fetch = jest.fn();
describe('fetchHelpers', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('getStatuses', async () => {
    const mockRes = { data: { stations: [] } };
    global.fetch.mockResolvedValue(
      Promise.resolve({ ok: true, json: () => Promise.resolve(mockRes) })
    );
    const res = await getStatuses();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(API_STATUS_URL, options);
    expect(res.data.stations).toBeDefined();
  });
  test('getStations', async () => {
    const mockRes = { data: { stations: [] } };
    global.fetch.mockResolvedValue(
      Promise.resolve({ ok: true, json: () => Promise.resolve(mockRes) })
    );
    const res = await getStations();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(API_STATIONS_URL, options);
    expect(res.data.stations).toBeDefined();
  });
});
