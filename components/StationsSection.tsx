import React, { useState, useEffect } from 'react';
import { StationResponse } from '../shared/model/Station';
import { mapStationAndStatus, unixToMs } from '../shared/utils/utils';
import { StationStatusResponse } from '../shared/model/StationStatus';
import { useQuery } from 'react-query';
import { getStatuses, getStations } from '../shared/fetchHelpers';
import { format } from 'date-fns';
import { StationsList } from './StationsList';
import { Nullable } from '../shared/utils/helperTypes';
import { DATE_TIME_FORMAT } from '../shared/constants';

interface StationSectionProps {
  stations: Nullable<StationResponse>;
  statuses: Nullable<StationStatusResponse>;
}
export const StationsSection = ({
  stations,
  statuses,
}: StationSectionProps): JSX.Element => {
  const [lastUpdated, setLastUpdated] = useState('');
  const {
    data: statusRes,
    isLoading: isLoadingStatus,
    isError: isStatusError,
  } = useQuery<StationStatusResponse, Error>('status', getStatuses, {
    ...(statuses && { initialData: statuses }),
    enabled: !statuses,
  });

  const {
    data: stationsRes,
    isLoading: isLoadingStations,
    isError: isStationError,
  } = useQuery<StationResponse, Error>('stations', getStations, {
    ...(stations && { initialData: stations }),
    enabled: !statuses,
  });
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
    return <i>Laster inn stasjonsinformasjon...</i>;
  }
  if (isStationError || isStatusError) {
    return <i>Fant ikke stasjonsinformasjon. Vennligst prøve igjen senere.</i>;
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
      <p>Sist oppdatert: {renderUpdatedInfo(statusRes)}</p>
      <StationsList stations={allInfo} />
    </>
  );
};
