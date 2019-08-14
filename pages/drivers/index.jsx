import Head from "components/Head";
import cachedFetch from "util/cachedFetch";
import DriversStandings from "components/DriversStandings";

const DriverCard = props => {
  return <></>;
};

const Drivers = props => {
  return (
    <>
      <Head title="Drivers" />
      <DriversStandings data={props.driversStandingsData} />
    </>
  );
};

Drivers.getInitialProps = async () => {
  const getDriversStandings = async () => {
    const res = await cachedFetch(
      `https://ergast.com/api/f1/current/driverStandings.json`
    );
    const driversStandings = await res.MRData.StandingsTable.StandingsLists[0];
    return driversStandings;
  };

  return {
    name: "Drivers",
    driversStandingsData: await getDriversStandings()
  };
};

export default Drivers;
