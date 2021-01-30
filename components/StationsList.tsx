import { AllInfoStation } from '../shared/model/Station';
import { StationItem } from './StationItem';
import {
  HEADING_STATIONS,
  HEADING_CAPACITY,
  HEADING_AVAILABLE_BIKES,
  HEADING_AVAILABLE_LOCKS,
  HEADING_ADRESS,
} from '../shared/constants';

interface StationsListProps {
  stations: AllInfoStation[];
}
export const StationsList = ({ stations }: StationsListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <td>{HEADING_STATIONS}</td>
          <td>{HEADING_ADRESS}</td>
          <td>{HEADING_CAPACITY}</td>
          <td>{HEADING_AVAILABLE_BIKES}</td>
          <td>{HEADING_AVAILABLE_LOCKS}</td>
        </tr>
      </thead>
      <tbody>
        {stations.map((station) => {
          return <StationItem key={station.station_id} station={station} />;
        })}
      </tbody>
    </table>
  );
};
