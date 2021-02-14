import { screen, fireEvent, render } from '@testing-library/react';
import { Search, SEARCH_LABEL } from './Search';

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
    const search = screen.getByLabelText(SEARCH_LABEL);
    expect(search).toBeInTheDocument();
    fireEvent.change(search, { target: { value: 'test' } });
    expect(setGlobalFilter).toHaveBeenCalledWith('test');
    const input = screen.getByDisplayValue('test');
    expect(input).toBeInTheDocument();
  });
});
