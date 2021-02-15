import { render, screen } from '../tests/testUtils';
import Home from '.';
import { MAIN_HEADING } from '../shared/constants';
import { statusesResponse, stationsResponse } from '../tests/mockResponse';
import { beforeEach } from '@jest/globals';
import { useStatuses } from '../hooks/useStatuses';
import { useStations } from '../hooks/useStations';
import { loadMap } from '../utils/GoogleMapInit';
import { ERROR_MESSAGE, LOADING_TEXT } from '../components/StationsSection';
jest.mock('../hooks/useStations', () => ({
  useStations: jest.fn(),
}));
jest.mock('../hooks/useStatuses', () => ({
  useStatuses: jest.fn(),
}));
jest.mock('../utils/GoogleMapInit', () => ({
  loadMap: jest.fn(),
}));
describe('Home', () => {
  const statuses = statusesResponse;
  const stations = stationsResponse;
  beforeEach(() => {
    useStatuses.mockImplementation(() => ({ data: {} }));
    useStations.mockImplementation(() => ({ data: {} }));
    loadMap.mockImplementation(() => document.createElement('script'));
  });
  test('Renders with data', () => {
    useStatuses.mockReturnValue({ data: statusesResponse });
    useStations.mockReturnValue({ data: stationsResponse });
    render(<Home stations={stations} statuses={statuses} />);
    expect(screen.getByText(MAIN_HEADING)).toBeInTheDocument();
  });

  test('Renders without data', () => {
    useStatuses.mockReturnValue({ data: statusesResponse });
    useStations.mockReturnValue({ data: stationsResponse });
    render(<Home stations={null} statuses={null} />);
    expect(screen.getByText(MAIN_HEADING)).toBeInTheDocument();
  });
  test('Renders loader', () => {
    useStatuses.mockReturnValue({ isLoading: true });
    useStations.mockReturnValue({ isLoading: true });
    render(<Home stations={null} statuses={null} />);
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(MAIN_HEADING)).not.toBeInTheDocument();
  });
  test('Renders error ', () => {
    useStatuses.mockReturnValue({ isError: true });
    useStations.mockReturnValue({ isError: true });
    render(<Home stations={null} statuses={null} />);
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByText(MAIN_HEADING)).not.toBeInTheDocument();
  });
});
