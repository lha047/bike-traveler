import { StationsSection, LOADING_TEXT } from './StationsSection';
import { render } from '../tests/testUtils';
import { screen } from '@testing-library/react';

describe('StationsSection', () => {
  beforeEach(() => {
    render(<StationsSection stations={null} statuses={null} />);
  });
  test('Renders loading', async () => {
    // const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });
    expect(screen.getByText(LOADING_TEXT));
  });
  test('Render error', () => {
    expect(screen.getByText(LOADING_TEXT));
  });
  test('Render response', async () => {
    expect(screen.getByText(LOADING_TEXT));
    //     const wrapper = render(<StationsSection stations={null} statuses={null} />);
    //     const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });
    //     // await waitFor(() => {});
    //     // expect(await screen.findByText(LAST_UPDATE_LABEL)).toBeInTheDocument();
  });
});
