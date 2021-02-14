import { StationsSection, LOADING_TEXT } from './StationsSection';
import { render } from '../tests/testUtils';
import { screen, waitFor } from '@testing-library/react';
import { useStatuses } from '../hooks/useStatuses';
import { statusesResponse, stationsResponse } from '../tests/mockResponse';
import { useStations } from '../hooks/useStations';
import { getStations, getStatuses } from '../shared/fetchHelpers';
jest.mock('../shared/fetchHelpers', () => ({
  getStations: jest.fn(),
  getStatuses: jest.fn(),
}));
jest.mock('../hooks/useStations', () => ({
  useStations: jest.fn(),
}));
// jest.mock('../hooks/useStatuses', () => ({
//   useStatuses: jest.fn(),
// }));
describe('StationsSection', () => {
  let wrapper;
  beforeEach(() => {
    // useStations.mockImplementation(() => {});
    // useStatuses.mockImplementation(() => {});
    wrapper = render(<StationsSection stations={null} statuses={null} />);
  });
  test('Renders loading', async () => {
    useStations.mockImplementation(() => ({ isLoading: true, data: '' }));
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
    expect(useStations).toHaveBeenNthCalledWith(null);
    expect(useStatuses).toHaveBeenNthCalledWith(null);
  });

  test.skip('Renders response', async () => {
    const mockStatus = statusesResponse;
    const mockStations = stationsResponse;
    getStations.mockResolvedValue(mockStations);
    getStatuses.mockResolvedValue(mockStatus);

    await waitFor(() => {
      expect(
        screen.getByText(mockStations.data.stations[0].name)
      ).toBeInTheDocument();
    });
  });
});
