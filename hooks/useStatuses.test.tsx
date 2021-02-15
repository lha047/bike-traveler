import { renderHook } from '@testing-library/react-hooks';
import { getStatuses } from '../shared/fetchHelpers';
import { QueryClientProvider, QueryClient } from 'react-query';
import { statusesResponse } from '../tests/mockResponse';
import { useStatuses } from './useStatuses';
jest.mock('../shared/fetchHelpers', () => ({
  getStatuses: jest.fn(),
}));

describe('useStatuses', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Returns data on success ', async () => {
    const mockRes = statusesResponse;
    getStatuses.mockResolvedValue(mockRes);

    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useStatuses(null), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockRes);
  });
  test('Does not request when station response exists ', async () => {
    const mockRes = statusesResponse;
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    });
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    getStatuses.mockResolvedValue(mockRes);
    const { result, waitFor } = renderHook(() => useStatuses(mockRes), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(getStatuses).toHaveBeenCalledTimes(0);
  });
  test('Returns error', async () => {
    const errorMsg = 'This is the error';
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    });
    getStatuses.mockReturnValue(
      Promise.reject({ ok: false, message: errorMsg, name: 'An error' })
    );
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useStatuses(null), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.error?.message).toEqual(errorMsg);
    });
  });
});
