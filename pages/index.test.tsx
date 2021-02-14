import { render, screen } from '../tests/testUtils';
import Home from '.';
import { MAIN_HEADING } from '../shared/constants';
import { statusesResponse, stationsResponse } from '../tests/mockResponse';

describe('Home', () => {
  const statuses = statusesResponse;
  const stations = stationsResponse;
  test('Renders with data', () => {
    render(<Home stations={stations} statuses={statuses} />);
    expect(screen.getByText(MAIN_HEADING)).toBeInTheDocument();
  });

  test('Renders without data', () => {
    render(<Home stations={null} statuses={null} />);
    expect(screen.getByText(MAIN_HEADING)).toBeInTheDocument();
  });
});
