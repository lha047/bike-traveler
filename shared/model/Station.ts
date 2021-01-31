import { StationStatus } from './StationStatus';

export interface StationResponse {
  last_updated: number;
  data: Data;
}

export interface Data {
  stations: Station[];
}

export interface Station {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
}
export type AllInfoStation = Station & StationStatus;
