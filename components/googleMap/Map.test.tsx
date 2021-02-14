import { render } from '../../tests/testUtils';
import { Map } from './Map';
import { allInfoMock } from '../../tests/mockResponse';
import '../../tests/googleMock';

describe('Map', () => {
  test('Renders', () => {
    const mapType = google.maps.MapTypeId.ROADMAP;
    render(
      <Map mapType={mapType} mapTypeControl={true} stations={allInfoMock} />
    );
  });
});
