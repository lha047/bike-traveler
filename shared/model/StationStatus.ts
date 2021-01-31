export interface StationStatusResponse {
  last_updated: number;
  data: Data;
}

export interface Data {
  stations: StationStatus[];
}

export interface StationStatus {
  is_installed: number;
  is_renting: number;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: number;
  is_returning: number;
  station_id: string;
}
