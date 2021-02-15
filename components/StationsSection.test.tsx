import {
  StationsSection,
  LOADING_TEXT,
  ERROR_MESSAGE,
} from './StationsSection';
import { render } from '../tests/testUtils';
import { screen } from '@testing-library/react';
import { useStatuses } from '../hooks/useStatuses';
import { statusesResponse, stationsResponse } from '../tests/mockResponse';
import { useStations } from '../hooks/useStations';
import { afterEach, expect } from '@jest/globals';

jest.mock('../hooks/useStations', () => ({
  useStations: jest.fn(),
}));
jest.mock('../hooks/useStatuses', () => ({
  useStatuses: jest.fn(),
}));
describe('StationsSection', () => {
  const mockStatus = statusesResponse;
  const mockStations = stationsResponse;
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Renders loading', async () => {
    useStations.mockImplementation(() => ({ isLoading: true, data: '' }));
    useStatuses.mockImplementation(() => ({
      isLoading: true,
      data: '',
    }));

    render(<StationsSection stations={null} statuses={null} />);
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
  });

  test('Renders response', async () => {
    useStations.mockImplementation(() => ({
      isLoading: false,
      data: mockStations,
    }));
    useStatuses.mockImplementation(() => ({
      isLoading: false,
      data: mockStatus,
    }));

    render(<StationsSection stations={null} statuses={null} />);
    mockStations.data.stations.forEach((s) => {
      expect(screen.getByText(s.name)).toBeInTheDocument();
      expect(screen.getAllByText(s.capacity).length > 0).toEqual(true);
    });
    mockStatus.data.stations.forEach((s) => {
      expect(screen.getAllByText(s.num_bikes_available).length > 0).toEqual(
        true
      );
      expect(screen.getAllByText(s.num_docks_available).length > 0).toEqual(
        true
      );
    });
  });
  test('Renders error when stations call is failing', async () => {
    useStations.mockImplementation(() => ({
      isLoading: false,
      isError: true,
    }));
    useStatuses.mockImplementation(() => ({
      isLoading: false,
      data: mockStatus,
    }));

    render(<StationsSection stations={null} statuses={null} />);
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});
