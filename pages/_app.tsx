import type { AppProps /*, AppContext */ } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
