import Head from 'next/head';
import { StationResponse } from '../shared/model/Station';
import { StationStatusResponse } from '../shared/model/StationStatus';
import styles from '../styles/Home.module.scss';
import { GetServerSidePropsResult } from 'next';
import { StationsSection } from '../components/StationsSection';
import { Nullable } from '../shared/utils/helperTypes';
import { options } from '../shared/fetchHelpers';
import { MAIN_HEADING } from '../shared/constants';

interface HomeProps {
  stations: Nullable<StationResponse>;
  statuses: Nullable<StationStatusResponse>;
}
export default function Home({ stations, statuses }: HomeProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>{MAIN_HEADING}</title>
        <meta
          name="description"
          content="Dette er en tjeneste basert på Oslo Bysykkel sine sanntidsdata."
        />
      </Head>
      <h1 className={styles.title}>{MAIN_HEADING}</h1>
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
