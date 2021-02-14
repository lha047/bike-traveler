import { useStations } from './useStations';
import { renderHook, act } from '@testing-library/react-hooks';
import * as helpers from '../shared/fetchHelpers';
import { QueryClientProvider, QueryClient } from 'react-query';
import { stationsResponse } from '../tests/mockResponse';
helpers.getStations = jest.fn();

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

    helpers.getStations.mockResolvedValue(mockRes);
    const { result, waitFor } = renderHook(() => useStations(null), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockRes);
  });

  test('Returns error', async () => {
    const errorMsg = 'This is the error';
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    });
    helpers.getStations.mockReturnValue(Promise.reject({ error: errorMsg }));
    await act(async () => {
      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result, waitFor } = renderHook(() => useStations(null), {
        wrapper,
      });

      await waitFor(
        () => {
          console.log('loading', result.current.status);
          console.log('data', result.current.data);
          console.log('error', result.current.error);
          expect(result.current.data).toEqual(errorMsg);
          expect(result.current.error).toEqual(errorMsg);
        },
        { timeout: 10000 }
      );
    });
  });
});
