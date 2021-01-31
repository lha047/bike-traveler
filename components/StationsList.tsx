import { AllInfoStation } from '../shared/model/Station';
import {
  HEADING_STATIONS,
  HEADING_CAPACITY,
  HEADING_AVAILABLE_BIKES,
  HEADING_AVAILABLE_LOCKS,
  HEADING_ADRESS,
} from '../shared/constants';
import styles from '../styles/StationList.module.scss';
import { useMemo } from 'react';
import {
  useTable,
  useGlobalFilter,
  Column,
  HeaderGroup,
  Row,
} from 'react-table';
import { Search } from './Search';

interface StationsListProps {
  stations: AllInfoStation[];
}
export const StationsList = ({ stations }: StationsListProps): JSX.Element => {
  const data = useMemo(() => stations, [stations]);
  const columns = useMemo((): Column<AllInfoStation>[] => {
    return [
      { accessor: 'name', Header: HEADING_STATIONS },
      { accessor: 'address', Header: HEADING_ADRESS },
      { accessor: 'capacity', Header: HEADING_CAPACITY },
      { accessor: 'num_bikes_available', Header: HEADING_AVAILABLE_BIKES },
      { accessor: 'num_docks_available', Header: HEADING_AVAILABLE_LOCKS },
    ];
  }, []);
  const tableInstance = useTable<AllInfoStation>(
    { columns, data },
    useGlobalFilter
  );
  const {
    getTableProps,
    preGlobalFilteredRows,
    setGlobalFilter,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = tableInstance;

  return (
    <>
      <Search
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.heading}>
          {headerGroups.map((headerGroup: HeaderGroup<AllInfoStation>) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...rest}>
                {headerGroup.headers.map(
                  (column: HeaderGroup<AllInfoStation>) => {
                    const { key, ...colRest } = column.getHeaderProps();
                    return (
                      <th key={key} {...colRest}>
                        {column.render('Header')}
                      </th>
                    );
                  }
                )}
              </tr>
            );
          })}
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((row: Row<AllInfoStation>) => {
            prepareRow(row);
            const { key, ...rowRest } = row.getRowProps();
            return (
              <tr key={key} {...rowRest}>
                {row.cells.map((cell) => {
                  const { key, ...cellRest } = cell.getCellProps();
                  return (
                    <td key={key} {...cellRest}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
