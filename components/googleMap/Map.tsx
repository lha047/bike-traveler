import { useRef, useState, useEffect } from 'react';
import styles from '../../styles/Map.module.scss';
import {
  GoogleMarkerInfo,
  createGoogleMarkers,
} from '../../shared/utils/googleMapUtils';
import { AllInfoStation } from '../../shared/model/Station';
import { Nullable } from '../../shared/utils/helperTypes';
import {
  GoogleMap,
  GoogleLatLng,
  GoogleMapType,
} from '../../shared/model/GoogleHelpers';

interface MapProps {
  mapType: GoogleMapType;
  mapTypeControl?: boolean;
  stations: Nullable<AllInfoStation[]>;
}

export const DEFAULT_LAT: Readonly<number> = 59.91273;
export const DEFAULT_LNG: Readonly<number> = 10.74609;
export const DEFAULT_ZOOM: Readonly<number> = 13;
export const Map = ({
  mapType,
  mapTypeControl,
  stations,
}: MapProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [, setMarkers] = useState<GoogleMarkerInfo[]>([]);

  useEffect(() => {
    if (map && stations) {
      const temp = createGoogleMarkers(map, stations);
      setMarkers(temp);
    }
  }, [map, stations, setMarkers]);
  useEffect(() => {
    if (!map) {
      const defaultMap = new google.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG);
      const initMap = (zoom: number, adress: GoogleLatLng) => {
        if (ref.current) {
          setMap(
            new google.maps.Map(ref.current, {
              zoom,
              center: adress,
              mapTypeControl,
              streetViewControl: false,
              rotateControl: false,
              scaleControl: true,
              fullscreenControl: false,
              panControl: false,
              zoomControl: true,
              mapTypeId: mapType,
              gestureHandling: 'cooperative',
              draggableCursor: 'pointer',
            })
          );
        }
      };
      const defaultMapStart = () => {
        initMap(DEFAULT_ZOOM, defaultMap);
      };
      defaultMapStart();
    }
  }, [map, mapType, mapTypeControl]);

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.map}></div>
    </div>
  );
};
