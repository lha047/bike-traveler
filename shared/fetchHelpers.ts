import { StationStatusResponse } from './model/StationStatus';

export const options = {
  headers: {
    'Client-Identifier': `${process.env.CLIENT_IDENTIFIER}`,
  },
};

export const getStatuses = async (): Promise<StationStatusResponse> => {
  const res = await fetch(
    `https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json`,
    options
  );
  const json: StationStatusResponse = await res.json();
  return json;
};
