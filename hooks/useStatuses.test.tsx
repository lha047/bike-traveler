import { renderHook, act } from '@testing-library/react-hooks';
import * as helpers from '../shared/fetchHelpers';
import { QueryClientProvider, QueryClient } from 'react-query';
import { statusesResponse } from '../tests/mockResponse';
import { useStatuses } from './useStatuses';
helpers.getStatuses = jest.fn();

describe('useStatuses', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Returns data when ', async () => {
    const mockRes = statusesResponse;
    helpers.getStatuses.mockResolvedValue(mockRes);

    await act(async () => {
      const queryClient = new QueryClient();
      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result, waitFor } = renderHook(() => useStatuses(null), {
        wrapper,
      });

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual(mockRes);
    });
  });
});
