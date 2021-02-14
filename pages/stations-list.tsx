import { StationsSection } from '../components/StationsSection';
import { StationStatusResponse } from '../shared/model/StationStatus';
import { StationResponse } from '../shared/model/Station';
import { Nullable } from '../shared/utils/helperTypes';
import { GetServerSidePropsResult } from 'next';
import { MAIN_HEADING } from '../shared/constants';
interface StationsListPageProps {
  stations: Nullable<StationResponse>;
  statuses: Nullable<StationStatusResponse>;
}

const StationsListPage: React.FC = ({
  stations,
  statuses,
}: StationsListPageProps) => {
  return (
    <>
      <h1>{MAIN_HEADING}</h1>
      <StationsSection stations={stations} statuses={statuses} />
    </>
  );
};

export default StationsListPage;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<StationsListPageProps>
> {
  try {
    const stationRes = await fetch(`${process.env.API_STATION}`, options);
    const stationData: StationResponse = await stationRes.json();
    const statusRes = await fetch(`${process.env.API_STATION_STATUS}`, options);
    const statusData: StationStatusResponse = await statusRes.json();
    return {
      props: {
        statuses: statusData,
        stations: stationData,
      },
    };
  } catch (e) {
    return {
      props: {
        statuses: null,
        stations: null,
      },
    };
  }
}
