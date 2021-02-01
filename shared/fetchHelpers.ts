import { StationStatusResponse } from './model/StationStatus';
import { StationResponse } from './model/Station';
export const BYSYKKEL_OPEN_API_URL: Readonly<string> =
  'https://oslobysykkel.no/apne-data/sanntid';
export const API_STATIONS_URL: Readonly<string> =
  'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
export const API_STATUS_URL: Readonly<string> =
  'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json';

export const options = {
  headers: {
    'Client-Identifier': `${process.env.CLIENT_IDENTIFIER}`,
  },
};
const fetchGet = async (url: string) => {
  const res = await fetch(url, options);
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject(res);
};

export const getStatuses = async (): Promise<StationStatusResponse> => {
  return await fetchGet(API_STATUS_URL);
};
export const getStations = async (): Promise<StationResponse> => {
  return await fetchGet(API_STATIONS_URL);
};
