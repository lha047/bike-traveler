import Head from 'next/head';
import { StationsList } from '../components/StationsList';
import { Station, StationResponse } from '../shared/model/Station';
import { StationStatusResponse } from '../shared/model/StationStatus';
import { options, getStatuses } from '../shared/fetchHelpers';
import { useQuery } from 'react-query';
import { mapStationAndStatus } from '../shared/utils/utils';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { GetServerSidePropsResult } from 'next';

interface HomeProps {
  stations: Station[];
  statuses: StationStatusResponse;
}
export default function Home({ stations, statuses }: HomeProps): JSX.Element {
  const [lastUpdated, setLastUpdated] = useState('');
  const { data } = useQuery<StationStatusResponse>('status', getStatuses, {
    initialData: statuses,
  });
  useEffect(() => {
    if (data && data.last_updated) {
      setLastUpdated(format(data.last_updated * 1000, 'dd.MM.yyyy HH:mm:ss'));
    }
  }, [data, setLastUpdated]);

  const allInfo = mapStationAndStatus(
    stations,
    data?.data?.stations ? data?.data?.stations : statuses.data?.stations
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Bike Traveler</title>
        <meta
          name="description"
          content="Dette er en tjeneste basert på Oslo Bysykkel sine sanntidsdata."
        />
      </Head>
      <h1 className={styles.title}>Velkomment til Bike Traveler</h1>
      <p className={styles.description}>
        Dette er en tjeneste basert på Oslo Bysykkel sine sanntidsdata.
      </p>
      <p>
        Finn ut mer på{' '}
        <a
          href="https://oslobysykkel.no/apne-data/sanntid"
          target="_blank"
          rel="noreferrer"
        >
          Oslo Bysykkel sine åpne data sider
        </a>
      </p>
      <p>
        Sist oppdatert{' '}
        <time dateTime={new Date(data?.last_updated * 1000).toString()}>
          {lastUpdated}
        </time>
      </p>

      <StationsList stations={allInfo} />
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<HomeProps>
> {
  const stationRes = await fetch(`${process.env.API_STATION}`, options);
  const stationData: StationResponse = await stationRes.json();
  const statusRes = await fetch(`${process.env.API_STATION_STATUS}`, options);
  const statusData: StationStatusResponse = await statusRes.json();

  return {
    props: {
      stations: stationData.data.stations,
      statuses: statusData,
    },
  };
}
