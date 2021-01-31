import Head from 'next/head';
import { StationResponse } from '../shared/model/Station';
import { StationStatusResponse } from '../shared/model/StationStatus';
import styles from '../styles/Home.module.scss';
import { GetServerSidePropsResult } from 'next';
import { StationsSection } from '../components/StationsSection';
import { Nullable } from '../shared/utils/helperTypes';
import { BYSYKKEL_OPEN_API_URL, options } from '../shared/fetchHelpers';

interface HomeProps {
  stations: Nullable<StationResponse>;
  statuses: Nullable<StationStatusResponse>;
}
export default function Home({ stations, statuses }: HomeProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bike Traveler</title>
        <meta
          name="description"
          content="Dette er en tjeneste basert på Oslo Bysykkel sine sanntidsdata."
        />
      </Head>
      <h1 className={styles.title}>Velkommen til Bike Traveler</h1>
      <p className={styles.description}>
        Tjenesten er basert på Oslo Bysykkel sine sanntidsdata.
      </p>
      <a href={BYSYKKEL_OPEN_API_URL} target="_blank" rel="noreferrer">
        Les mer hos Oslo Bysykkel
      </a>
      <StationsSection stations={stations} statuses={statuses} />
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<HomeProps>
> {
  try {
    const stationRes = await fetch(`${process.env.API_STATION}`, options);
    const stationData: StationResponse = await stationRes.json();
    const statusRes = await fetch(`${process.env.API_STATION_STATUS}`, options);
    const statusData: StationStatusResponse = await statusRes.json();
    return {
      props: {
        statuses: statusData,
        stations: stationData,
      },
    };
  } catch (e) {
    return {
      props: {
        statuses: null,
        stations: null,
      },
    };
  }
}
