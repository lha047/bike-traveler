import { AllInfoStation } from './../model/Station';
import { Nullable } from './helperTypes';
import { GoogleMap, GoogleLatLng } from '../../components/googleMap/Map';
import { GoogleMarker } from '../model/GoogleHelpers';

export const createInfoContent = ({
  name,
  address,
  num_bikes_available,
  num_docks_available,
  capacity,
}: AllInfoStation): string => {
  return `
  <div>
      <h2>${name}</h2>
      <p>Adresse: ${address}</p>
      <p>Ledige sykler: ${num_bikes_available}</p>    
      <p>Ledige låser: ${num_docks_available}</p>    
      <p>Kapasitet: ${capacity}</p>    
  </div>
`;
};
export const createLatLng = (lat: number, lng: number): GoogleLatLng => {
  return new google.maps.LatLng(lat, lng);
};
export const createMarker = (
  map: GoogleMap,
  stationInfo: AllInfoStation
): GoogleMarker => {
  const { lat, lon, name } = stationInfo;
  const marker = new google.maps.Marker({
    position: createLatLng(lat, lon),
    map,
    title: name,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: createInfoContent(stationInfo),
  });
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
  return marker;
};

export interface GoogleMarkerInfo {
  station_id: string;
  marker: GoogleMarker;
}
export const createGoogleMarkers = (
  map: GoogleMap,
  stations: Nullable<AllInfoStation[]>
): GoogleMarkerInfo[] => {
  if (!stations) {
    return [];
  }
  return stations.map((station) => {
    return { ...station, marker: createMarker(map, station) };
  });
};
