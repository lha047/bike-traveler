import Head from 'next/head';
import { StationResponse } from '../shared/model/Station';
import { StationStatusResponse } from '../shared/model/StationStatus';
import styles from '../styles/Home.module.scss';
import { GetServerSidePropsResult } from 'next';
import { Nullable } from '../shared/utils/helperTypes';
import { options } from '../shared/fetchHelpers';
import { MAIN_HEADING } from '../shared/constants';
import { useState, useEffect } from 'react';
import { loadMap } from '../utils/GoogleMapInit';
import { Map } from '../components/googleMap/Map';
import { mapStationAndStatus } from '../shared/utils/utils';

interface HomeProps {
  stations: Nullable<StationResponse>;
  statuses: Nullable<StationStatusResponse>;
}
export default function Home({ stations, statuses }: HomeProps): JSX.Element {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  useEffect(() => {
    const googleMapScript = loadMap();
    googleMapScript.addEventListener('load', function () {
      setMapScriptLoaded(true);
    });
  }, []);
  const allInfo = mapStationAndStatus(
    stations ? stations.data.stations : null,
    statuses ? statuses.data?.stations : null
  );

  return (
    <>
      <Head>
        <title>{MAIN_HEADING}</title>
        <meta
          name="description"
          content="Dette er en tjeneste basert på Oslo Bysykkel sine sanntidsdata."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <h1 className={styles.title}>{MAIN_HEADING}</h1>
      {mapScriptLoaded && (
        <Map
          mapType={google.maps.MapTypeId.ROADMAP}
          mapTypeControl={true}
          stations={allInfo}
        />
      )}
    </>
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
