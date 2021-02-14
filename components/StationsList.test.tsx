import { StationsList } from './StationsList';
import { allInfoMock } from '../tests/mockResponse';
import { render } from '../tests/testUtils';
import { fireEvent, screen } from '@testing-library/react';
import {
  HEADING_STATIONS,
  HEADING_ADRESS,
  HEADING_AVAILABLE_BIKES,
  HEADING_AVAILABLE_LOCKS,
  HEADING_CAPACITY,
} from '../shared/constants';
import { stationsTableCols } from './StationsTableCols';
import { SEARCH_LABEL } from './Search';
describe('StationsList', () => {
  const mockStations = allInfoMock;
  beforeEach(() => {
    render(
      <StationsList stations={mockStations} columns={stationsTableCols()} />
    );
  });
  test('Renders content', () => {
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
    const search = screen.getByLabelText(SEARCH_LABEL);
    expect(search).toBeInTheDocument();
    fireEvent.change(search, { target: { value: 'Sesam' } });
    expect(screen.getByText('Sesam station')).toBeInTheDocument();
    expect(screen.queryByText('Test station')).not.toBeInTheDocument();
    fireEvent.change(search, { target: { value: '' } });
    expect(screen.getByText('Sesam station')).toBeInTheDocument();
    expect(screen.getByText('test station')).toBeInTheDocument();
  });
});
