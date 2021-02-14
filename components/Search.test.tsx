import { render } from '@testing-library/react';
import { Search } from './Search';

describe('Search', () => {
  test('Renders', () => {
    const setGlobalFilter = jest.fn();
    const globalFilter = '';
    const preGlobalFilteredRows = jest.fn();

    render(
      <Search
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    );
  });
});
