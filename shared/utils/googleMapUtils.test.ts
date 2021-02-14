import { createGoogleMarkers } from './googleMapUtils';
import { allInfoMock } from '../../tests/mockResponse';
import '../../tests/googleMock';
describe('googleMapUtils', () => {
  const map = jest.fn();
  test('createGoogleMarkers - creates markers', () => {
    const stations = allInfoMock;
    const res = createGoogleMarkers(map, stations);
    expect(res.length).toEqual(allInfoMock.length);
    res.forEach((responseMarker) => {
      const { station_id, marker } = responseMarker;
      expect(marker).toBeDefined();
      const station = allInfoMock.find(
        ({ station_id: id }) => id === station_id
      );
      expect(station).toBeDefined();
    });
  });
  test('createGoogleMarkers - handles stations null', () => {
    const stations = null;
    const res = createGoogleMarkers(map, stations);
    expect(res.length).toEqual(0);
  });
});
