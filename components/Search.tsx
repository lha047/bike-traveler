import React from 'react';
import { Row, FilterValue } from 'react-table';
import style from '../styles/Search.module.scss';
import { AllInfoStation } from '../shared/model/Station';
export const SEARCH_LABEL: Readonly<string> = 'Søk';
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
    setValue(value);
    setGlobalFilter(value || undefined);
  };

  return (
    <>
      <label htmlFor={'search'}>{SEARCH_LABEL}</label>
      <input
        type="search"
        id={'search'}
        name={'search'}
        value={value || ''}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={`${count} stasjoner...`}
        className={style.search}
      />
    </>
  );
};
