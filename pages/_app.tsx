import type { AppProps /*, AppContext */ } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import '../styles/globals.css';
import { Footer } from '../components/Footer';
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Footer />
    </QueryClientProvider>
  );
}

export default MyApp;
