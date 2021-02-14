import StationsListPage from './stations-list';
import { statusesResponse, stationsResponse } from '../tests/mockResponse';
import { MAIN_HEADING } from '../shared/constants';
import { render } from '../tests/testUtils';
import { screen } from '@testing-library/react';

describe('stations-list page', () => {
  const statuses = statusesResponse;
  const stations = stationsResponse;
  test('Renders with data', () => {
    render(<StationsListPage stations={stations} statuses={statuses} />);
    expect(screen.getByText(MAIN_HEADING)).toBeInTheDocument();
    expect(
      screen.getByText(stations.data.stations[0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(stations.data.stations[1].name)
    ).toBeInTheDocument();
  });

  test('Renders without data', () => {
    render(<StationsListPage stations={null} statuses={null} />);
    expect(screen.getByText(MAIN_HEADING)).toBeInTheDocument();
  });
});
