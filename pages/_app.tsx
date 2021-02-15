import type { AppProps /*, AppContext */ } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import '../styles/globals.css';
import { Footer } from '../components/Footer';
import pageStyles from '../styles/Page.module.scss';
import { Layout } from '../components/layout/Layout';
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main className={pageStyles.container}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
      <Footer />
    </QueryClientProvider>
  );
}

export default MyApp;
