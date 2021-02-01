import { render, screen } from '../tests/testUtils';
import Home from '.';
import { StationResponse } from '../shared/model/Station';
import { StationStatusResponse } from '../shared/model/StationStatus';
import { MAIN_HEADING } from '../shared/constants';

describe('Home', () => {
  const stations: StationResponse = {
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
  const statuses: StationStatusResponse = {
    data: {
      stations: [
        { station_id: '1', num_bikes_available: 4, num_docks_available: 4 },
        { station_id: '2', num_bikes_available: 6, num_docks_available: 12 },
      ],
    },
  };
  test('Renders with data', () => {
    render(<Home stations={stations} statuses={statuses} />);
    expect(screen.getByText(MAIN_HEADING)).toBeInTheDocument();
    expect(
      screen.getByText(stations.data.stations[0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(stations.data.stations[1].name)
    ).toBeInTheDocument();
  });

  test('Renders without data', () => {
    render(<Home stations={null} statuses={null} />);
    expect(screen.getByText(MAIN_HEADING)).toBeInTheDocument();
  });
});
