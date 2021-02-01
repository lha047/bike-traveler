import React from 'react';
import { Row, FilterValue } from 'react-table';
import style from '../styles/Search.module.scss';
import { AllInfoStation } from '../shared/model/Station';

interface SearchProps {
  preGlobalFilteredRows: Row<AllInfoStation>[];
  globalFilter: string;
  setGlobalFilter: (value: FilterValue) => void;
}
export const Search = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: SearchProps): JSX.Element => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = (value: string) => {
    setGlobalFilter(value || undefined);
  };
  return (
    <span>
      Søk:{' '}
      <input
        type="search"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} stasjoner...`}
        className={style.search}
      />
    </span>
  );
};
