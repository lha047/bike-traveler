import Head from 'next/head';
import { StationResponse } from '../shared/model/Station';
import { StationStatusResponse } from '../shared/model/StationStatus';
import styles from '../styles/Home.module.scss';
import { GetServerSidePropsResult } from 'next';
import { Nullable } from '../shared/utils/helperTypes';
import { options } from '../shared/fetchHelpers';
import { MAIN_HEADING } from '../shared/constants';
import React, { useState, useEffect } from 'react';
import { loadMap } from '../utils/GoogleMapInit';
import { Map } from '../components/googleMap/Map';
import { mapStationAndStatus } from '../shared/utils/utils';
import { useStatuses } from '../hooks/useStatuses';
import { useStations } from '../hooks/useStations';
import { ERROR_MESSAGE, LOADING_TEXT } from '../components/StationsSection';

interface HomeProps {
  stations: Nullable<StationResponse>;
  statuses: Nullable<StationStatusResponse>;
}
export default function Home({ stations, statuses }: HomeProps): JSX.Element {
  const {
    data: statusRes,
    isLoading: isLoadingStatus,
    isError: isStatusError,
  } = useStatuses(statuses);

  const {
    data: stationsRes,
    isLoading: isLoadingStations,
    isError: isStationError,
  } = useStations(stations);

  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  useEffect(() => {
    if (!mapScriptLoaded) {
      const googleMapScript = loadMap();
      googleMapScript.addEventListener('load', function () {
        setMapScriptLoaded(true);
      });
      if (typeof google === 'object' && typeof google.maps === 'object') {
        setMapScriptLoaded(true);
      }
    }
  }, [mapScriptLoaded]);

  const allInfo = mapStationAndStatus(
    stationsRes ? stationsRes.data.stations : null,
    statusRes ? statusRes.data?.stations : null
  );

  if (isLoadingStations || isLoadingStatus) {
    return <i className={styles.center}>{LOADING_TEXT}</i>;
  }
  if (isStationError || isStatusError) {
    return <i className={styles.center}>{ERROR_MESSAGE}</i>;
  }

  return (
    <>
      <Head>
        <title>{MAIN_HEADING}</title>
        <meta
          name="description"
          content="Dette er en tjeneste basert på Oslo Bysykkel sine sanntidsdata."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {mapScriptLoaded && <Map mapTypeControl={true} stations={allInfo} />}
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
