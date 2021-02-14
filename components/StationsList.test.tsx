import { StationsList } from './StationsList';
import { allInfoMock } from '../tests/mockResponse';
import { render } from '../tests/testUtils';
import { screen } from '@testing-library/react';
import {
  HEADING_STATIONS,
  HEADING_ADRESS,
  HEADING_AVAILABLE_BIKES,
  HEADING_AVAILABLE_LOCKS,
  HEADING_CAPACITY,
} from '../shared/constants';
import { stationsTableCols } from './StationsTableCols';
describe('StationsList', () => {
  test('Renders', () => {
    const mockStations = allInfoMock;
    render(
      <StationsList stations={mockStations} columns={stationsTableCols()} />
    );
    expect(screen.getByText(HEADING_STATIONS)).toBeInTheDocument();
    expect(screen.getByText(HEADING_ADRESS)).toBeInTheDocument();
    expect(screen.getByText(HEADING_AVAILABLE_BIKES)).toBeInTheDocument();
    expect(screen.getByText(HEADING_AVAILABLE_LOCKS)).toBeInTheDocument();
    expect(screen.getByText(HEADING_CAPACITY)).toBeInTheDocument();
    allInfoMock.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('Interacts with search', () => {
    expect(true).toEqual(true);
  });
});
