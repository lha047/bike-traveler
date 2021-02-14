import {
  HEADING_STATIONS,
  HEADING_CAPACITY,
  HEADING_AVAILABLE_BIKES,
  HEADING_AVAILABLE_LOCKS,
  HEADING_ADRESS,
} from '../shared/constants';
import { AllInfoStation } from '../shared/model/Station';
import { Column } from 'react-table';
export const stationsTableCols = (): Column<AllInfoStation>[] => {
  return [
    { accessor: 'name', Header: HEADING_STATIONS },
    { accessor: 'address', Header: HEADING_ADRESS },
    { accessor: 'capacity', Header: HEADING_CAPACITY },
    { accessor: 'num_bikes_available', Header: HEADING_AVAILABLE_BIKES },
    { accessor: 'num_docks_available', Header: HEADING_AVAILABLE_LOCKS },
  ];
};
