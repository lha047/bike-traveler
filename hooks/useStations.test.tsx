import { useStations } from './useStations';
import { renderHook } from '@testing-library/react-hooks';
import { getStations } from '../shared/fetchHelpers';
import { QueryClientProvider, QueryClient } from 'react-query';
import { stationsResponse } from '../tests/mockResponse';

jest.mock('../shared/fetchHelpers', () => ({
  getStations: jest.fn(),
}));

describe('useStations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Returns data on success ', async () => {
    const mockRes = stationsResponse;
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    });
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    getStations.mockResolvedValue(mockRes);
    const { result, waitFor } = renderHook(() => useStations(null), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockRes);
  });

  test('Does not request when station response exists ', async () => {
    const mockRes = stationsResponse;
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    });
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    getStations.mockResolvedValue(mockRes);
    const { result, waitFor } = renderHook(() => useStations(mockRes), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(getStations).toHaveBeenCalledTimes(0);
  });

  test('Returns error', async () => {
    const errorMsg = 'This is the error';
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    });
    getStations.mockReturnValue(
      Promise.reject({ ok: false, message: errorMsg, name: 'An error' })
    );
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useStations(null), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.error?.message).toEqual(errorMsg);
    });
  });
});
