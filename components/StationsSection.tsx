import React, { useState, useEffect } from 'react';
import { StationResponse } from '../shared/model/Station';
import { mapStationAndStatus, unixToMs } from '../shared/utils/utils';
import { StationStatusResponse } from '../shared/model/StationStatus';
import { format } from 'date-fns';
import { StationsList } from './StationsList';
import { Nullable } from '../shared/utils/helperTypes';
import { DATE_TIME_FORMAT } from '../shared/constants';
import { stationsTableCols } from './StationsTableCols';
import { useStatuses } from '../hooks/useStatuses';
import { useStations } from '../hooks/useStations';
import styles from '../styles/StationsSection.module.scss';
export const LOADING_TEXT: Readonly<string> =
  'Laster inn stasjonsinformasjon...';
interface StationSectionProps {
  stations: Nullable<StationResponse>;
  statuses: Nullable<StationStatusResponse>;
}
export const StationsSection = ({
  stations,
  statuses,
}: StationSectionProps): JSX.Element => {
  const [lastUpdated, setLastUpdated] = useState('');
  const columns = stationsTableCols();
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

  useEffect(() => {
    if (statusRes && statusRes.last_updated) {
      setLastUpdated(
        format(unixToMs(statusRes.last_updated), DATE_TIME_FORMAT)
      );
    }
    return () => {
      setLastUpdated('');
    };
  }, [statusRes, setLastUpdated]);

  const allInfo = mapStationAndStatus(
    stationsRes ? stationsRes.data.stations : null,
    statusRes ? statusRes.data?.stations : null
  );
  if (isLoadingStations || isLoadingStatus) {
    return <i className={styles.center}>{LOADING_TEXT}</i>;
  }
  if (isStationError || isStatusError) {
    return (
      <i className={styles.center}>
        Fant ikke stasjonsinformasjon. Vennligst prøve igjen senere.
      </i>
    );
  }
  const renderUpdatedInfo = (statusRes: Nullable<StationStatusResponse>) => {
    if (!statusRes) {
      return <i>-</i>;
    }
    return (
      <time dateTime={new Date(unixToMs(statusRes?.last_updated)).toString()}>
        {lastUpdated}
      </time>
    );
  };
  return (
    <>
      <p className={styles.center}>
        Sist oppdatert: {renderUpdatedInfo(statusRes)}
      </p>
      <StationsList stations={allInfo} columns={columns} />
    </>
  );
};
