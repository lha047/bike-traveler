import { AllInfoStation } from '../shared/model/Station';

interface StationProps {
  station: AllInfoStation;
}
export const StationItem = ({
  station: {
    name,
    address,
    capacity,
    num_bikes_available,
    num_docks_available,
  },
}: StationProps) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{address}</td>
      <td>{capacity}</td>
      <td>{num_bikes_available}</td>
      <td>{num_docks_available}</td>
    </tr>
  );
};
